import {
    autoUpdate,
    type Dimensions,
    flip,
    type FlipOptions,
    getOverflowAncestors,
    hide,
    type Middleware,
    type MiddlewareState,
    offset,
    type Placement,
    type ReferenceType,
    size,
    useFloating,
    type UseFloatingOptions,
} from '@floating-ui/react-dom';
import { type MutableRefObject, useMemo } from 'react';
import {
    type BoxShadow,
    findMaxBottomBoxShadow,
    findMaxTopBoxShadow,
    parseBoxShadow,
    parseSize,
} from '../../utils/css-values';

export interface DropdownRefs<T> {
    floating: MutableRefObject<HTMLElement | null>;
    reference: MutableRefObject<T | null>;

    setFloating(node: HTMLElement | null): void;

    setReference(node: T | null): void;
}

export interface UseDropdownResponse<T> {
    refs: DropdownRefs<T>;
    x: number;
    y: number;

    update(): void;
}

export interface UseDropdownOptions {
    open: boolean;
    placement?: UseFloatingOptions['placement'];
    width?: 'auto' | 'initial' | 'reference' | number;
}

function getWidthValue(dimensions: Dimensions, width: UseDropdownOptions['width']): string | undefined {
    switch (width) {
        case 'auto':
        case 'initial':
        case undefined:
            return width;
        case 'reference':
            return `${dimensions.width}px`;
        default:
            return `${width}px`;
    }
}

const SPACING = 2;

function computeOffset(element: HTMLElement, placement: Placement): number {
    const isTopPlacement = placement.includes('top');
    const style = window.getComputedStyle(element);
    const boxShadows: BoxShadow[] = parseBoxShadow(style.boxShadow);
    const isTransparent = style.outlineColor === 'transparent' || style.outlineColor === 'rgba(0, 0, 0, 0)';
    if (isTransparent || style.outlineStyle === 'none' || parseSize(style.outlineWidth) === 0) {
        return isTopPlacement
            ? SPACING + findMaxTopBoxShadow(boxShadows)
            : SPACING + findMaxBottomBoxShadow(boxShadows);
    }

    const outlineSpace = parseSize(style.outlineWidth) + parseSize(style.outlineOffset);
    return isTopPlacement
        ? SPACING + Math.max(findMaxTopBoxShadow(boxShadows), outlineSpace)
        : SPACING + Math.max(findMaxBottomBoxShadow(boxShadows), outlineSpace);
}

// The dropdown is portalled out of its reference's scroll container, so that container does not clip it:
// once the reference has scrolled out of view, the dropdown would otherwise float over what lies outside
// the container (e.g. a fixed app header). `hide` reports an empty reference rect as clipped, and every rect
// is empty where nothing is laid out (jsdom), so only a reference with a size hides the dropdown.
const hideWhenReferenceHidden: Middleware = {
    name: 'hideWhenReferenceHidden',
    fn({ elements, middlewareData, rects }) {
        const hasSize = rects.reference.width > 0 || rects.reference.height > 0;
        Object.assign(elements.floating.style, {
            visibility: middlewareData.hide?.referenceHidden && hasSize ? 'hidden' : '',
        });
        return {};
    },
};

function isVerticalScrollContainer(ancestor: Element): boolean {
    return /auto|scroll|overlay/.test(window.getComputedStyle(ancestor).overflowY)
        && ancestor.scrollHeight > ancestor.clientHeight;
}

// Flipping within the viewport lets a dropdown opened above its reference cover what lies above the reference's
// scroll container (e.g. a fixed app header), so it flips within that container instead. Containers that do
// not scroll are left out: one with `overflow: auto` but nothing to scroll (e.g. a short section) would leave
// room on neither side and keep the dropdown below the reference, past the bottom of the viewport.
function getFlipOptions({ elements }: MiddlewareState): FlipOptions {
    const scrollContainers = elements.reference instanceof Element
        ? getOverflowAncestors(elements.reference)
            .filter((ancestor): ancestor is Element => ancestor instanceof Element)
            .filter(isVerticalScrollContainer)
        : [];

    if (scrollContainers.length === 0) {
        return { fallbackStrategy: 'initialPlacement' };
    }

    // Cross-axis overflow would make every placement overflow a container narrower than the dropdown.
    return { boundary: scrollContainers, crossAxis: false, fallbackStrategy: 'initialPlacement' };
}

export function useDropdown<T extends ReferenceType>({
    open,
    placement = 'bottom-start',
    width,
}: UseDropdownOptions): UseDropdownResponse<T> {
    const {
        x,
        y,
        update,
        refs,
    } = useFloating<T>({
        middleware: [
            flip(getFlipOptions),
            size({
                apply({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        width: getWidthValue(rects.reference, width),
                    });
                },
            }, [width]),
            offset((state: MiddlewareState) => {
                const element = state.elements.reference as HTMLElement;
                return computeOffset(element, state.placement);
            }),
            hide(),
            hideWhenReferenceHidden,
        ],
        open,
        placement,
        strategy: 'absolute',
        transform: false,
        whileElementsMounted: autoUpdate,
    });

    return useMemo(() => (<UseDropdownResponse<T>>{
        x,
        y,
        update,
        refs,
    }), [refs, update, x, y]);
}
