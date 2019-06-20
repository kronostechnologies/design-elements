import React from 'react';
import { storiesOf } from '@storybook/react';
import { Search, SearchGlobal } from '@equisoft/design-elements-react';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <Search
            id="searchbar_contextual"
            label="Search"
            placeholder="Ex.: Miky Mike"
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            id="searchbar_global"
            label="Search"
            placeholder="Ex.: Marquee Mark"
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            disabled
            id="searchbar_disabled"
            label="Search"
            placeholder="Ex.: Sorry it's disabled"
        />
    ));
