import React from 'react';
import debounce from 'lodash-es/debounce';

import SearchInput from './search-input';

const SearchContextual = ({ disabled, id, label, onInput }) => (
    <SearchInput
        disabled={disabled}
        id={id}
        label={label}
        onInput={debounce(onInput, 250)}
    />
);

export default SearchContextual;
