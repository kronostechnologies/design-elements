import { MutableRefObject, RefObject, useCallback } from 'react';

interface UseScrollIntoViewRequest {
    container: RefObject<HTMLElement> | MutableRefObject<HTMLElement>;
}

interface UseScrollIntoViewResponse<T> {
    scrollIntoView: (element: T, alignToTop?: boolean) => void;
}

export function useScrollIntoView<TElement extends HTMLElement>({
    container,
}: UseScrollIntoViewRequest): UseScrollIntoViewResponse<TElement> {
    const scrollIntoView: (element: TElement, forceAlignToTop?: boolean) => void = useCallback(
        (element, forceAlignToTop = false) => {
            if (!container.current) {
                return;
            }

            const { offsetHeight: elementOffsetHeight, offsetTop: elementOffsetTop } = element;
            const { offsetHeight: parentOffsetHeight, scrollTop: parentScrollTop } = container.current;

            const computedStyle = getComputedStyle(container.current);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);

            const topScrollPosition = elementOffsetTop - paddingTop;
            const bottomScrollPosition = elementOffsetTop - parentOffsetHeight + elementOffsetHeight + paddingBottom;

            const isAbove = topScrollPosition < parentScrollTop;
            const isBelow = bottomScrollPosition > parentScrollTop;

            if (isAbove || (isBelow && forceAlignToTop)) {
                container.current.scrollTo(0, topScrollPosition);
            } else if (isBelow) {
                container.current.scrollTo(0, bottomScrollPosition);
            }
        },
        [container],
    );

    return {
        scrollIntoView,
    };
}
