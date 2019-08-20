import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <SearchContextual
            id="searchbar_contextual"
            label="Search"
            placeholder="Ex.: Miky Mike"
            changeCallback={action('Searching for')}
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            id="searchbar_global"
            label="Search"
            placeholder="Ex.: Marquee Mark"
            searchCallback={action('Searching for')}
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            disabled
            id="searchbar_disabled"
            label="Search"
        />
    ));
