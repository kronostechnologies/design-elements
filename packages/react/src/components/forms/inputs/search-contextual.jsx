import React from 'react';
import { debounce } from 'lodash-es';

import SearchInput from './search-input';

export default ({ disabled, id, label, onInput }) => (
    <SearchInput
        disabled={disabled}
        id={id}
        label={label}
        onInput={debounce(onInput, 250)}
    />
);
