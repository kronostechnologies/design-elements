import React from 'react';
import { storiesOf } from '@storybook/react';
import { SearchContextual, SearchGlobal } from '@equisoft/design-elements-react';

storiesOf('Search Bar', module)
    .add('Contextual', () => (
        <SearchContextual
            id="searchbar_contextual"
            label="Search"
            onInput={()=>{console.log("SEARCHING CONTEXTUALLY")}}
            placeholder="Ex.: Miky Mike"
        />
    ))
    .add('Global', () => (
        <SearchGlobal
            id="searchbar_global"
            label="Search"
            onSubmit={()=>{console.log("SEARCHING ON SUBMIT")}}
            placeholder="Ex.: Marquee Mark"
        />
    ))
    .add('Disabled', () => (“
        <SearchGlobal
            disabled
            id="searchbar_disabled"
            label="Search"
            placeholder="Ex.: Sorry it's disabled"
        />
    ));
