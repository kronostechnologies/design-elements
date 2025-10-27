import { MutableRefObject, RefObject, useCallback } from 'react';

interface UseScrollIntoViewRequest {
    container: RefObject<HTMLElement> | MutableRefObject<HTMLElement>;
    scrollingContainer: RefObject<HTMLElement> | MutableRefObject<HTMLElement>;
}

interface UseScrollIntoViewResponse<T> {
    scrollIntoView: (element: T, alignToTop?: boolean) => void;
}

export function useScrollIntoView<TElement extends HTMLElement>({
    container,
    scrollingContainer,
}: UseScrollIntoViewRequest): UseScrollIntoViewResponse<TElement> {
    const scrollIntoView: (element: TElement, forceAlignToTop?: boolean) => void = useCallback(
        (element, forceAlignToTop = false) => {
            if (!container.current || !scrollingContainer.current) {
                return;
            }

            const { offsetHeight: elementOffsetHeight, offsetTop: elementOffsetTop } = element;
            const { offsetTop: parentOffsetTop } = container.current;
            const { offsetHeight: scrollingOffsetHeight, scrollTop: parentScrollTop } = scrollingContainer.current;

            const computedStyle = getComputedStyle(container.current);
            const paddingTop = parseFloat(computedStyle.paddingTop);
            const paddingBottom = parseFloat(computedStyle.paddingBottom);

            const realParentOffsetTop = container === scrollingContainer ? 0 : parentOffsetTop;
            const topScrollPosition = realParentOffsetTop + elementOffsetTop - paddingTop;
            const bottomScrollPosition = (
                realParentOffsetTop + elementOffsetTop - scrollingOffsetHeight + elementOffsetHeight + paddingBottom
            );

            const isAbove = topScrollPosition < parentScrollTop;
            const isBelow = bottomScrollPosition > parentScrollTop;

            if (isAbove || (isBelow && forceAlignToTop)) {
                scrollingContainer.current.scrollTo(0, topScrollPosition);
            } else if (isBelow) {
                scrollingContainer.current.scrollTo(0, bottomScrollPosition);
            }
        },
        [container, scrollingContainer],
    );

    return {
        scrollIntoView,
    };
}
