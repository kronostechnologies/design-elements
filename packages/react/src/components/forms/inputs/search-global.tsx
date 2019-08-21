import React from 'react';
import { SearchInput, SearchInputProps } from './search-input';

const SearchGlobal = ({ disabled, id, label, onSearch }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        hasButton
        id={id}
        label={label}
        onSearch={onSearch}
    />
);

export { SearchGlobal };
