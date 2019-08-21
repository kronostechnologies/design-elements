import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';

const SearchContextual = ({ disabled, id, label, changeCallback }: SearchInputProps) => (
    <SearchInput
        disabled={disabled}
        id={id}
        label={label}
        changeCallback={changeCallback}
    />
);

export { SearchContextual };
