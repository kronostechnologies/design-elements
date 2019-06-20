import React from 'react';
import styled from 'styled-components';

import Search from './search';
import ButtonSearch from '../../buttons/search';

const SearchSubmit = styled(ButtonSearch)`
  border-left: 0;
  border-radius: 0 0.25rem 0.25rem 0;
  position: relative;
`;

export default ({ disabled, ...props }) => (
    <Search {...props} disabled={disabled} global>
        <SearchSubmit
            disabled={disabled}
            type="submit"
        >
            Search
        </SearchSubmit>
    </Search>
);
