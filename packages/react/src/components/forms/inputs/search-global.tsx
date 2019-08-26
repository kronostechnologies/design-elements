import React from 'react';

import { SearchInput, SearchInputProps } from './search-input';
const uuidv1 = require('uuid/v1');

const SearchGlobal = ({ disabled, label, searchCallback }: SearchInputProps) => {
    const id = uuidv1();
    return (
        <SearchInput
            disabled={disabled}
            hasButton
            id={id}
            label={label}
            searchCallback={searchCallback}
        />
    );
};

export { SearchGlobal };
