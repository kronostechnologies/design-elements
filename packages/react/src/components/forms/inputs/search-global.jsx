import React from 'react';

import SearchInput from './search-input';

const SearchGlobal = ({ disabled, id, label, onSearch }) => (
    <SearchInput
        disabled={disabled}
        hasButton
        id={id}
        label={label}
        onSearch={onSearch}
    />
);

export default SearchGlobal;
