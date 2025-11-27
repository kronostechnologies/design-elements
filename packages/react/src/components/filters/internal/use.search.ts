import { useCallback, useState } from 'react';

export interface UseSearchOptions {
    initialSearchValue?: string;
    optionsCount: number;
}

export interface UseSearchResponse {
    searchEnabled: boolean;
    searchValue: string;

    handleSearchChange?(newValue: string): void;

    setSearchValue(value: string): void;
}

export function useSearch({
    initialSearchValue = '',
    optionsCount,
}: UseSearchOptions): UseSearchResponse {
    const [searchValue, setSearchValue] = useState<string>(initialSearchValue);

    const handleSearchChange = useCallback((newValue: string) => {
        setSearchValue(newValue);
    }, []);

    const searchEnabled = optionsCount > 10;
    return {
        handleSearchChange: searchEnabled ? handleSearchChange : undefined,
        searchEnabled,
        searchValue,
        setSearchValue,
    };
}
