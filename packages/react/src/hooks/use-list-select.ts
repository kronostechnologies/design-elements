import { useCallback, useState } from 'react';

interface UseListSelectRequest<T> {
    selectedElements: T[];
    currentSelectedElement: T | undefined;
    previousSelectedElement: T | undefined;
    selectElement: (element: T) => void;
    deselectElement: (element: T) => void;
    revertPreviousSelectedElement: () => void;
    clearSelection: () => void;
}

export function useListSelect<T>(
    predicate: (element: T, elementToCompare: T) => boolean,
    initialSelectedElementCallback: () => T | undefined = () => undefined,
    isMultiSelect = false,
): UseListSelectRequest<T> {
    const [selectedElements, setSelectedElements] = useState<T[]>(() => {
        const initialSelectedElement = initialSelectedElementCallback();
        return initialSelectedElement ? [initialSelectedElement] : [];
    });
    const [
        previousSelectedElement,
        setPreviousSelectedElement,
    ] = useState<T | undefined>(initialSelectedElementCallback);
    const currentSelectedElement: T | undefined = selectedElements[selectedElements.length - 1];

    const selectElement: (element: T) => void = useCallback((element: T) => {
        setPreviousSelectedElement(element);
        if (isMultiSelect) {
            const isAlreadySelected = !!selectedElements.find(
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

    const clearSelection: () => void = useCallback(() => {
        setSelectedElements([]);
        setPreviousSelectedElement(undefined);
    }, []);

    return {
        selectedElements,
        currentSelectedElement,
        previousSelectedElement,
        selectElement,
        deselectElement,
        revertPreviousSelectedElement,
        clearSelection,
    };
}
