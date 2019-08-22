import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';

const SearchGlobal = ({ disabled, label, onSearch, placeholder }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        hasButton
        label={label}
        onSearch={onSearch}
        placeholder={placeholder}
    />
);

export { SearchGlobal };
