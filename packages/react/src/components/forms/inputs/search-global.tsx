import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';

const SearchGlobal = ({ disabled, initialValue, label, searchCallback }: SearchInputProps) => {
    return (
        <SearchInput
            disabled={disabled}
            hasButton
            initialValue={initialValue}
            label={label}
            searchCallback={searchCallback}
        />
    );
};

export { SearchGlobal };
