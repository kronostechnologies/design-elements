import React from 'react';

import { List } from '@equisoft/design-elements-react';

export default {
    title: 'List',
    component: List,
};

const optionsA = [
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
];

const optionsB = [
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
        label: 'Option E',
        value: 'optionE',
    },
    {
        label: 'Option F',
        value: 'optionF',
    },
];

const optionsC = [
    {
        value: 'optionA',
    },
    {
        value: 'optionB',
    },
    {
        value: 'optionC',
    },
    {
        value: 'optionD',
    },
];

export const list = () => (
    <List
        options={optionsA}
        onChange={option => console.log('onChange', option)}
    />
);

export const listWithCheck = () => (
    <List
        withCheck={true}
        defaultValue={'optionC'}
        options={optionsA}
        onChange={option => console.log('onChange', option)}
    />
);

export const listWithOverflow = () => (
    <List
        options={optionsB}
        onChange={option => console.log('onChange', option)}
    />
);

export const listWithThreeItemsVisible = () => (
    <List
        options={optionsB}
        onChange={option => console.log('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const listWithoutOptionLabel = () => (
    <List
        options={optionsC}
        onChange={option => console.log('onChange', option)}
        numberOfItemsVisible={3}
    />
);
