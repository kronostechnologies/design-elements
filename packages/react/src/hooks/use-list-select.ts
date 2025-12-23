import { useCallback, useState } from 'react';

interface UseListSelectRequest<T> {
    selectedElements: T[];
    currentSelectedElement: T | undefined;
    previousSelectedElement: T | undefined;
    selectElement: (element: T) => void;
    deselectElement: (element: T) => void;
    revertPreviousSelectedElement: () => void;
    clearSelection: () => void;
    toggleSelectedElements: (element: T) => void;
    setSelectedElements: (elements: T[]) => void;
}

export function useListSelect<T>(
    predicate: (element: T, elementToCompare: T) => boolean,
    initialSelectedElementCallback: () => T | T[] | undefined = () => undefined,
    isMultiSelect = false,
): UseListSelectRequest<T> {
    const [selectedElements, setSelectedElements] = useState<T[]>(() => {
        const initial = initialSelectedElementCallback();
        if (Array.isArray(initial)) {
            return initial;
        }
        if (initial !== undefined) {
            return [initial];
        }
        return [];
    });

    const [
        previousSelectedElement,
        setPreviousSelectedElement,
    ] = useState<T | undefined>(() => {
        const initialSelectedElement = initialSelectedElementCallback();
        return Array.isArray(initialSelectedElement) ? initialSelectedElement[0] : undefined;
    });

    const currentSelectedElement: T | undefined = selectedElements[selectedElements.length - 1];

    const selectElement: (element: T) => void = useCallback((element: T) => {
        setPreviousSelectedElement(element);
        if (isMultiSelect) {
            const isAlreadySelected = selectedElements.find(
                (currentElement: T) => predicate(currentElement, element),
            );
            if (!isAlreadySelected) {
                setSelectedElements((prev) => [...prev, element]);
            }
        } else {
            setSelectedElements([element]);
        }
    }, [isMultiSelect, predicate, selectedElements]);

    const deselectElement: (element: T) => void = useCallback((element: T) => {
        setSelectedElements((prev) => prev.filter((currentElement: T) => !predicate(currentElement, element)));
    }, [predicate]);

    const revertPreviousSelectedElement: () => void = useCallback(() => {
        if (!isMultiSelect && previousSelectedElement) {
            setSelectedElements([previousSelectedElement]);
        }
    }, [isMultiSelect, previousSelectedElement]);

    const toggleSelectedElements: (element: T) => void = useCallback((element: T) => {
        const isAlreadySelected = selectedElements.find(
            (currentElement: T) => predicate(currentElement, element),
        );
        if (isAlreadySelected) {
            deselectElement(element);
        } else {
            selectElement(element);
        }
    }, [deselectElement, predicate, selectElement, selectedElements]);

    const clearSelection: () => void = useCallback(() => {
        setSelectedElements([]);
        setPreviousSelectedElement(undefined);
    }, []);

    return {
        clearSelection,
        currentSelectedElement,
        deselectElement,
        previousSelectedElement,
        revertPreviousSelectedElement,
        selectElement,
        selectedElements,
        setSelectedElements,
        toggleSelectedElements,
    };
}
