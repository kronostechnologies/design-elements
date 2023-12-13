import { useCallback, useRef } from 'react';
import { allSameLetter } from '../utils/string';

interface UseListSearchRequest<T> {
    elements: T[];
    focusedElement?: T;
    onFoundElementChange?: (element: T | undefined) => void;
    searchPropertyAccessor: (element: T) => string;
    predicate?: (element: T) => boolean;
    searchResetTimeout?: number;
}

interface UseListSearchResponse {
    handleSearchInput: (char: string) => void;
}

export function useListSearch<T>({
    elements,
    focusedElement,
    onFoundElementChange,
    searchPropertyAccessor,
    predicate = () => true,
    searchResetTimeout = 500,
}: UseListSearchRequest<T>): UseListSearchResponse {
    const searchTimeout = useRef<NodeJS.Timeout | undefined>(undefined);
    const searchString = useRef('');

    const filterElements: (list: T[], searchText: string) => T[] = useCallback(
        (list, searchText) => list.filter((element) => {
            const matches = searchPropertyAccessor(element).toLowerCase().startsWith(searchText.toLowerCase());
            return matches && predicate(element);
        }),
        [predicate, searchPropertyAccessor],
    );

    const findElement: (searchText: string) => T | undefined = useCallback((searchText) => {
        const startIndex = focusedElement ? elements.indexOf(focusedElement) + 1 : 0;
        const sortedElements = [
            ...elements.slice(startIndex),
            ...elements.slice(0, startIndex),
        ];

        const firstMatch = filterElements(sortedElements, searchText)[0];

        if (firstMatch) {
            return firstMatch;
        }

        if (allSameLetter(searchText)) {
            const matches = filterElements(sortedElements, searchText[0]);
            return matches[0];
        }

        return undefined;
    }, [filterElements, focusedElement, elements]);

    const handleSearchInput: (char: string) => void = useCallback((char) => {
        if (searchTimeout.current !== undefined) {
            clearTimeout(searchTimeout.current);
        }

        searchTimeout.current = setTimeout(() => {
            searchString.current = '';
        }, searchResetTimeout);

        searchString.current += char;

        if (onFoundElementChange) {
            onFoundElementChange(findElement(searchString.current));
        }
    }, [findElement, onFoundElementChange, searchResetTimeout]);

    return {
        handleSearchInput,
    };
}
