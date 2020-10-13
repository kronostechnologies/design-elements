import { Listbox } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Listbox',
    component: Listbox,
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
];

const optionsWithoutLabel = [
    {
        value: 'optionA',
    },
    {
        value: 'optionB',
    },
];

export const normal = () => (
    <Listbox
        options={options}
        onChange={option => console.log('onChange', option)}
    />
);

export const listboxWithAutofocus = () => (
    <Listbox
        options={options}
        onChange={option => console.log('onChange', option)}
        autofocus={true}
    />
);

export const listboxWithCheck = () => (
    <Listbox
        checkIndicator={true}
        defaultValue={'optionC'}
        options={options}
        onChange={option => console.log('onChange', option)}
    />
);

export const listboxWithThreeItemsVisible = () => (
    <Listbox
        options={options}
        onChange={option => console.log('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const listboxWithoutOptionLabel = () => (
    <Listbox
        options={optionsWithoutLabel}
        onChange={option => console.log('onChange', option)}
        numberOfItemsVisible={3}
    />
);
