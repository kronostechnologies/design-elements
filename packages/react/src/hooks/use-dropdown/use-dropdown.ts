import {
    autoUpdate,
    type Dimensions,
    flip,
    type MiddlewareState,
    offset,
    type Placement,
    type ReferenceType,
    size,
    useFloating,
    type UseFloatingOptions,
} from '@floating-ui/react-dom';
import { type MutableRefObject, useEffect, useMemo } from 'react';
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

// The dropdown is portalled, so the reference's scroll container does not clip it: once that container has
// scrolled the reference out of view, the dropdown would float over what lies outside it (e.g. a fixed header).
function useHideWhenReferenceHidden(
    open: boolean,
    reference: ReferenceType | null,
    floating: HTMLElement | null,
): void {
    useEffect(() => {
        if (!open || !(reference instanceof Element) || !floating || typeof IntersectionObserver === 'undefined') {
            return undefined;
        }

        const observer = new IntersectionObserver(([entry]) => {
            Object.assign(floating.style, { visibility: entry.isIntersecting ? '' : 'hidden' });
        });
        observer.observe(reference);

        return () => observer.disconnect();
    }, [open, reference, floating]);
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
        elements: { reference, floating },
    } = useFloating<T>({
        middleware: [
            flip({ fallbackStrategy: 'initialPlacement' }),
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
        ],
        open,
        placement,
        strategy: 'absolute',
        transform: false,
        whileElementsMounted: autoUpdate,
    });

    useHideWhenReferenceHidden(open, reference, floating);

    return useMemo(() => (<UseDropdownResponse<T>>{
        x,
        y,
        update,
        refs,
    }), [refs, update, x, y]);
}
