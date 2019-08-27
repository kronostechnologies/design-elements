import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';

const SearchGlobal = ({ disabled, label, searchCallback }: SearchInputProps) => {
    return (
        <SearchInput
            disabled={disabled}
            hasButton
            label={label}
            searchCallback={searchCallback}
        />
    );
};

export { SearchGlobal };
