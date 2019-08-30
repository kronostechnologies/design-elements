import React from 'react';
import { SearchInput, SearchInputProps } from './search-input';

const SearchContextual = ({ disabled, label, onChange, placeholder }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        label={label}
        onChange={onChange}
        placeholder={placeholder}
    />
);

export { SearchContextual };
