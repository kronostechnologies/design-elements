import React from 'react';
import { storiesOf } from '@storybook/react';
import { InputSearch } from '@equisoft/design-elements-react';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <InputSearch
            id="searchbar_contextual"
            label="Search"
            placeholder="Ex.: Miky Mike"
        />
    ))
    .add('Disabled', () => (
        <InputSearch
            disabled
            id="searchbar_disabled"
            label="Search"
            placeholder="Ex.: Sorry it's disabled"
        />
    ));
