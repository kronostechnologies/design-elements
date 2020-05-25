import { SearchContextual } from '@equisoft/design-elements-react';
import * as React from 'react';

export default {
    title: 'Search/Search Contextual',
    component: SearchContextual,
};

export const contextual = () => (
    <SearchContextual/>
);

export const disabled = () => (
    <SearchContextual disabled/>
);
export const eventCallback = () => (
    <SearchContextual
        onChange={event => {
            console.log(`Searching for: ${event.currentTarget.value}`);
        }}
    />
);
