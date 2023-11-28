import { useState } from 'react';

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
}

export function useListCursor<TElement>({
    elements,
    initialElement,
    predicate = () => true,
}: UseListCursorRequest<TElement>): UseListCursorResponse<TElement> {
    const [selectedElement, setSelectedElement] = useState<TElement | undefined>(initialElement);

    function selectFirst(): TElement | undefined {
        const firstElement = elements.find(predicate);

        if (firstElement) {
            setSelectedElement(firstElement);
        }

        return firstElement;
    }

    function selectLast(): TElement | undefined {
        const lastElement = [...elements].reverse().find(predicate);

        if (lastElement) {
            setSelectedElement(lastElement);
        }

        return lastElement;
    }

    function selectPrevious(): TElement | undefined {
        if (selectedElement === undefined) {
            return selectFirst();
        }

        const selectedIndex = elements.indexOf(selectedElement);
        const previousElement = elements.slice(0, selectedIndex).reverse().find(predicate);

        if (previousElement) {
            setSelectedElement(previousElement);
        }

        return previousElement;
    }

    function selectNext(): TElement | undefined {
        if (selectedElement === undefined) {
            return selectFirst();
        }

        const selectedIndex = elements.indexOf(selectedElement);
        const nextElement = elements.slice(selectedIndex + 1).find(predicate);

        if (nextElement) {
            setSelectedElement(nextElement);
        }

        return nextElement;
    }

    return {
        selectedElement,
        setSelectedElement,
        selectPrevious,
        selectNext,
        selectFirst,
        selectLast,
    };
}
