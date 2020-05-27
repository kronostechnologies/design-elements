import React from 'react';
import { SearchGlobal } from './search-global';

export default {
    title: 'Search/Search Global',
    component: SearchGlobal,
};

export const global = () => (
    <SearchGlobal
        label="Search"
        placeholder="Ex.: Marquee Mark"
    />
);
export const disabled = () => (
    <SearchGlobal
        disabled
        label="Search"
        placeholder="Ex.: Sorry it's disabled"
    />
);
export const eventCallback = () => (
    <SearchGlobal
        label="Search"
        onSearch={value => {
            console.log(`Searching for: ${value}`);
        }}
        placeholder="Ex.: Marquee Mark"
    />
);
