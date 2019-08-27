import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <SearchContextual
            label="Search"
            changeCallback={(value)=>{console.log(`Searching for: ${value}`)}}
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            label="Search"
            searchCallback={(value)=>{console.log(`Searching for: ${value}`)}}
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            disabled
            label="Search"
        />
    ));
