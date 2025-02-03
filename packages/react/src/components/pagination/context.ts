import { createContext, useContext } from 'react';

export interface PaginationContextProps {
    resultsPerPage: number;
    numberOfResults: number;
    totalPages: number;
    pagesDisplayed: number;
    currentPage: number;

    /**
     * Function callback to change page
     */
    changePage: (pageNumber: number) => void;
}

export const PaginationContext = createContext<PaginationContextProps | undefined>(undefined);

export function usePaginationContext(): PaginationContextProps {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePaginationContext must be used within a PaginationProvider');
    }
    return context;
}
