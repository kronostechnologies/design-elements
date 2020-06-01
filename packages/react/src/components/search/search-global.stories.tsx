import React from 'react';
import { SearchGlobal } from './search-global';

export default {
    title: 'Search/Search Global',
    component: SearchGlobal,
};

export const global = () => (
    <SearchGlobal/>
);
export const disabled = () => (
    <SearchGlobal disabled/>
);
export const eventCallback = () => (
    <SearchGlobal
        onSearch={value => {
            console.log(`Searching for: ${value}`);
        }}
    />
);
