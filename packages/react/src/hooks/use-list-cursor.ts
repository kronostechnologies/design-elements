import { useCallback, useState } from 'react';
import { findFirstElement, findLastElement, findNextElement, findPreviousElement } from '../utils/array';

interface UseListCursorResponse<T> {
    selectedElement: T | undefined;
    setSelectedElement: (element: T | undefined) => void;
    selectPrevious: () => T | undefined;
    selectNext: () => T | undefined;
    selectFirst: () => T | undefined;
    selectLast: () => T | undefined;
}

interface UseListCursorRequest<T> {
    elements: T[];
    initialElement?: T;
    predicate?: (element: T) => boolean;
    wrapAround?: boolean;
}

export function useListCursor<TElement>({
    elements,
    initialElement,
    predicate = () => true,
    wrapAround = false,
}: UseListCursorRequest<TElement>): UseListCursorResponse<TElement> {
    const [selectedElement, setSelectedElement] = useState<TElement | undefined>(initialElement);

    const selectFirst: () => TElement | undefined = useCallback(() => {
        const firstElement = findFirstElement(elements, predicate);

        if (firstElement) {
            setSelectedElement(firstElement);
        }

        return firstElement;
    }, [elements, predicate]);

    const selectLast: () => TElement | undefined = useCallback(() => {
        const lastElement = findLastElement(elements, predicate);

        if (lastElement) {
            setSelectedElement(lastElement);
        }

        return lastElement;
    }, [elements, predicate]);

    const selectPrevious: () => TElement | undefined = useCallback(() => {
        if (selectedElement === undefined) {
            return selectFirst();
        }

        const selectedIndex = elements.indexOf(selectedElement);
        const previousElement = findPreviousElement(elements, selectedIndex, predicate, { wrapAround });

        if (previousElement) {
            setSelectedElement(previousElement);
        }

        return previousElement;
    }, [elements, predicate, selectFirst, selectedElement, wrapAround]);

    const selectNext: () => TElement | undefined = useCallback(() => {
        if (selectedElement === undefined) {
            return selectFirst();
        }

        const selectedIndex = elements.indexOf(selectedElement);
        const nextElement = findNextElement(elements, selectedIndex, predicate, { wrapAround });

        if (nextElement) {
            setSelectedElement(nextElement);
        }

        return nextElement;
    }, [elements, predicate, selectFirst, selectedElement, wrapAround]);

    return {
        selectedElement,
        setSelectedElement,
        selectPrevious,
        selectNext,
        selectFirst,
        selectLast,
    };
}
