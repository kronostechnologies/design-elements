import React from 'react';

import { SearchGlobal } from '@equisoft/design-elements-react';

export default {
    title: 'Search/Search Global',
    component: SearchGlobal,
};

export const global = () => (
    <SearchGlobal label="Search"/>
);
export const disabled = () => (
    <SearchGlobal disabled label="Search"/>
);
export const eventCallback = () => (
    <SearchGlobal
        label="Search"
        onSearch={value => {
            console.log(`Searching for: ${value}`);
        }}
    />
);
