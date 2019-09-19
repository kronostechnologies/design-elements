import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';
import * as React from 'react';

export default { title: 'Search Bar' };

export const contextual = () => (
    <SearchContextual
        label="Search"
        onChange={event => {
            console.log(`Searching for: ${event.currentTarget.value}`);
        }}
        placeholder="Ex.: Miky Mike"
    />
);
export const global = () => (
    <SearchGlobal
        label="Search"
        onSearch={value => {
            console.log(`Searching for: ${value}`);
        }}
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
