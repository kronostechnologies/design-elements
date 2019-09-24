import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';
import * as React from 'react';

export default { title: 'Search Bar' };

export const contextual = () => (
    <div>
        <h3 style={{marginTop: '0'}}>Global</h3>
        <SearchContextual
            label="Search"
            onChange={event => {
                console.log(`Searching for: ${event.currentTarget.value}`);
            }}
            placeholder="Ex.: Miky Mike"
        />
        <h3>Contextual</h3>
        <SearchGlobal
            label="Search"
            onSearch={value => {
                console.log(`Searching for: ${value}`);
            }}
            placeholder="Ex.: Marquee Mark"
        />
    </div>
);
export const disabled = () => (
    <div>
        <SearchContextual
            label="Search"
            disabled
            placeholder="Ex.: Miky Mike"
        /><br/>
        <SearchGlobal
            disabled
            label="Search"
            placeholder="Ex.: Sorry it's disabled"
        />
    </div>
);
