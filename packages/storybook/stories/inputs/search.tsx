import * as React from 'react';

import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Search Bar', module);
stories.addDecorator(withKnobs);

stories.add('Contextual', () => (
        <SearchContextual
            id={text('id', 'searchbar_contextual')}
            label={text('label', 'Search')}
            onChange={(value)=>{console.log(`Searching for: ${value}`)}}
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            id={text('id', 'searchbar_global')}
            label={text('label', 'Search')}
            onSearch={(value)=>{console.log(`Searching for: ${value}`)}}
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            disabled={boolean('disabled', true)}
            id={text('id', 'searchbar_disabled')}
            label={text('label', 'Search')}
        />
    ));
