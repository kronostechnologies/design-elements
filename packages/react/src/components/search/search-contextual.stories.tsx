import * as React from 'react';
import { SearchContextual } from './search-contextual';

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
