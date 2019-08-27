import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';

const SearchContextual = ({ disabled, label, changeCallback }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        label={label}
        changeCallback={changeCallback}
    />
);

export { SearchContextual };
