import * as React from 'react';

import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';

const stories = storiesOf('Search Bar', module);
stories.addDecorator(withKnobs);

stories.add('Contextual', () => (
        <SearchContextual
            label={text('label', 'Search')}
            onChange={(value) => {console.log(`Searching for: ${value}`); }}
            placeholder="Ex.: Miky Mike"
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            label={text('label', 'Search')}
            onSearch={(value) => {console.log(`Searching for: ${value}`); }}
            placeholder="Ex.: Marquee Mark"
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            disabled={boolean('disabled', true)}
            label={text('label', 'Search')}
            placeholder="Ex.: Sorry it's disabled"
        />
    ));
