import React from 'react';
import styled from 'styled-components';

import SearchInput from './search-input';
import SearchButton from '../../buttons/search/search-button.jsx';

const SearchSubmit = styled(SearchButton)`
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  position: relative;
`;

export default ({ disabled, id, label, onSubmit }) => (
    <SearchInput
        disabled={disabled}
        id={id}
        label={label}
        onSubmit={onSubmit}
        global
    >
        <SearchSubmit
            disabled={disabled}
            type="submit"
            onClick={onSubmit}
        >
            Search
        </SearchSubmit>
    </SearchInput>
);
