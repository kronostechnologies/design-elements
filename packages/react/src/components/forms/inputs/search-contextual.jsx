import React from 'react';

import SearchInput from './search-input';

const SearchContextual = ({ disabled, id, label, onChange }) => (
    <SearchInput
        disabled={disabled}
        id={id}
        label={label}
        onChange={onChange}
    />
);

export default SearchContextual;
