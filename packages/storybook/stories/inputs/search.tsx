import React from 'react';

import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';
import { action } from '@storybook/addon-actions';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <SearchContextual
            onChange={(value) => {console.log(`Searching for: ${value}`); }}
            placeholder={text('placeholder', 'Ex.: Miky Mike')}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            label={text('label', 'Search')}
            onSearch={(value) => {console.log(`Searching for: ${value}`); }}
            placeholder={text('placeholder', 'Ex.: Marquee Mark')}
            disabled={boolean('disabled', false)}
        />
    ))
    .add('Disabled', () => (
        <SearchGlobal
            label={text('label', 'Search')}
            placeholder={text('placeholder', 'Ex.: Sorry this field is disabled')}
            disabled={boolean('disabled', true)}
        />
    ));
