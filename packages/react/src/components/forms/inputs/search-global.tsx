import React from 'react';
import { SearchInput, SearchInputProps } from './search-input';

const SearchGlobal = ({ disabled, initialValue, id, label, searchCallback }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        hasButton
        id={id}
        initialValue={initialValue}
        label={label}
        searchCallback={searchCallback}
    />
);

export { SearchGlobal };
