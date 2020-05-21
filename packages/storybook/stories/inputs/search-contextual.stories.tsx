import { SearchContextual } from '@equisoft/design-elements-react';
import * as React from 'react';

export default {
    title: 'Search/Search Contextual',
    component: SearchContextual,
};

export const contextual = () => (
    <SearchContextual label="Search"/>
);

export const disabled = () => (
    <SearchContextual label="Search" disabled/>
);
export const eventCallback = () => (
    <SearchContextual
        label="Search"
        onChange={event => {
            console.log(`Searching for: ${event.currentTarget.value}`);
        }}
    />
);
