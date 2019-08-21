import React from 'react';
import { SearchInput, SearchInputProps } from './search-input';

const SearchGlobal = ({ disabled, id, label, searchCallback }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        hasButton
        id={id}
        label={label}
        searchCallback={searchCallback}
    />
);

export { SearchGlobal };
