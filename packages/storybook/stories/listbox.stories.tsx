import { Listbox } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Controls/Listbox',
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

export const Normal: Story = () => (
    <Listbox
        options={options}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const ListboxWithAutofocus: Story = () => (
    <Listbox
        options={options}
        onChange={(option) => console.info('onChange', option)}
        autofocus
    />
);

export const ListboxWithMultiselect: Story = () => (
    <Listbox
        checkIndicator
        defaultValue={['optionA', 'optionC']}
        multiselect
        options={options}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const ListboxWithCheck: Story = () => (
    <Listbox
        checkIndicator
        defaultValue="optionC"
        options={options}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const ListboxWithThreeItemsVisible: Story = () => (
    <Listbox
        options={options}
        onChange={(option) => console.info('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const ListboxWithoutOptionLabel: Story = () => (
    <Listbox
        options={optionsWithoutLabel}
        onChange={(option) => console.info('onChange', option)}
        numberOfItemsVisible={3}
    />
);
