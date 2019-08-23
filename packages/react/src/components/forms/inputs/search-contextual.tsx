import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';
const uuidv1 = require('uuid/v1');

const SearchContextual = ({ disabled, label, changeCallback }: SearchInputProps) => {
    const id = uuidv1();

    return (
        <SearchInput
            disabled={disabled}
            id={id}
            label={label}
            changeCallback={changeCallback}
        />
    );
};

export { SearchContextual };
