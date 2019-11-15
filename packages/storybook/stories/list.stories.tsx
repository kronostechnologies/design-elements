import React from 'react';

import { List } from '@equisoft/design-elements-react';

export default {
    title: 'List',
    component: List,
};

const options = [
    {
        label: 'Option A',
        value: 'optionA',
    },
    {
        label: 'Option B',
        value: 'optionB',
    },
    {
        label: 'Option C',
        value: 'optionC',
    },
    {
        label: 'Option D',
        value: 'optionD',
    },
    {
        label: 'Option C',
        value: 'optionF',
    },
    {
        label: 'Option D',
        value: 'optionG',
    },
];

const optionsWithoutLabel = [
    {
        value: 'optionA',
    },
    {
        value: 'optionB',
    },
];

export const list = () => (
    <List
        options={options}
        onChange={option => console.log('onChange', option)}
    />
);

export const listWithCheck = () => (
    <List
        checkIndicator={true}
        defaultValue={'optionC'}
        options={options}
        onChange={option => console.log('onChange', option)}
    />
);

export const listWithThreeItemsVisible = () => (
    <List
        options={options}
        onChange={option => console.log('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const listWithoutOptionLabel = () => (
    <List
        options={optionsWithoutLabel}
        onChange={option => console.log('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const listWithAutofocus = () => (
    <List
        options={options}
        onChange={option => console.log('onChange', option)}
        autofocus={true}
    />
);
