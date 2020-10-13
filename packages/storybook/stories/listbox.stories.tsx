import { Listbox, Option } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Listbox',
    component: Listbox,
};

const options: Option[] = [
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

export const listboxWithMultiselect = () => (
    <Listbox
        checkIndicator
        defaultValue={['optionA', 'optionC']}
        multiselect
        options={options}
        onChange={option => console.log('onChange', option)}
    />
);

export const listboxWithOnSelectCallback = () => {
    const ListboxOptions: Option[] = [
        {
            label: 'Option A',
            value: 'optionA',
            onSelect: (option) => console.log(option),
        },
        {
            label: 'Option B',
            value: 'optionB',
            onSelect: (option) => console.log(option),
        },
    ];

    return <Listbox options={ListboxOptions}/>;
};

export const listboxWithCheck = () => (
    <Listbox
        checkIndicator={true}
        defaultValue="optionC"
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
