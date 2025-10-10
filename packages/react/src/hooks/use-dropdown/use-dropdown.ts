import {
    type Dimensions,
    offset,
    type Placement,
    type ReferenceType,
    size,
    type UseFloatingOptions,
} from '@floating-ui/react';
import { autoUpdate, flip, type MiddlewareState, useFloating } from '@floating-ui/react-dom';
import { type MutableRefObject, useMemo } from 'react';

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

const BASE_OFFSET = 4;

function computeOffset(element: HTMLElement, placement: Placement): number {
    const style = window.getComputedStyle(element);
    const outlineOffset = style.outlineOffset;
    const outlineWidth = style.outlineWidth;
    const factor = placement.includes('top') ? -1 : 1;
    return BASE_OFFSET - (factor * (parseFloat(outlineWidth) - parseFloat(outlineOffset)));
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
            offset((state: MiddlewareState) => {
                const element = state.elements.reference as HTMLElement;
                return computeOffset(element, state.placement);
            }),
            flip({ fallbackStrategy: 'initialPlacement' }),
            size({
                apply({ rects, elements }) {
                    Object.assign(elements.floating.style, {
                        width: getWidthValue(rects.reference, width),
                    });
                },
            }),
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
