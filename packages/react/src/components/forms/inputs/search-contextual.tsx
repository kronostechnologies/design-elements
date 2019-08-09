import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';

const SearchContextual = ({ disabled, id, label, onChange }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        id={id}
        label={label}
        onChange={onChange}
    />
);

export { SearchContextual };
