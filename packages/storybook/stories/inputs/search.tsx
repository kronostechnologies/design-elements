import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <SearchContextual
            label="Search"
            onChange={event => {
                console.log(`Searching for: ${event.currentTarget.value}`);
            }}
            placeholder="Ex.: Miky Mike"
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            label="Search"
            onSearch={value => {
                console.log(`Searching for: ${value}`);
            }}
            placeholder="Ex.: Marquee Mark"
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            disabled
            label="Search"
            placeholder="Ex.: Sorry it's disabled"
        />
    ));
