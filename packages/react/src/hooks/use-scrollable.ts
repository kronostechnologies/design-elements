import { RefObject, useEffect } from 'react';

interface UseScrollableOptions {
    scrollableElement: RefObject<HTMLElement>;
    scrollByPercent: number;
    onScroll: (params: { atStartX: boolean; atEndX: boolean; }) => void;
}

interface UseScrollableReturns {
    scrollToLeft: () => void;
    scrollToRight: () => void;
}

/**
 * Support only horizontal scroll for now
 */
export function useScrollable({
    scrollableElement,
    scrollByPercent,
    onScroll,
}: UseScrollableOptions): UseScrollableReturns {
    useEffect(() => {
        if (!scrollableElement.current) {
            return;
        }

        const scrollArea = scrollableElement.current;

        function handleScroll(): void {
            const scrollX = scrollArea.scrollLeft;
            const wholeWidth = scrollArea.scrollWidth;
            const scrollVisibleWidth = scrollArea.offsetWidth;

            onScroll({
                atStartX: scrollX === 0,
                atEndX: Math.ceil(scrollX) + scrollVisibleWidth >= wholeWidth,
            });
        }

        handleScroll();

        const resizeObserver = new ResizeObserver(handleScroll);
        resizeObserver.observe(scrollArea);
        scrollArea.addEventListener('scroll', handleScroll);
        return () => {
            resizeObserver.unobserve(scrollArea);
            scrollArea.removeEventListener('scroll', handleScroll);
        };
    }, [scrollableElement, onScroll]);

    const handleScroll = (dir: 'left' | 'right') => () => {
        if (!scrollableElement.current) {
            return;
        }

        const scrollableVisibleWidth = scrollableElement.current.offsetWidth;
        const moveBy = scrollableVisibleWidth * scrollByPercent;
        const currentPosX = scrollableElement.current.scrollLeft;
        const newPosX = dir === 'left' ? currentPosX - moveBy : currentPosX + moveBy;

        scrollableElement.current.scrollTo({ left: newPosX, behavior: 'smooth' });
    };

    return {
        scrollToLeft: handleScroll('left'),
        scrollToRight: handleScroll('right'),
    };
}
