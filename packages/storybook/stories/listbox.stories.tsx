import { Listbox } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Controls/Listbox',
    component: Listbox,
};

const options = [
    {
        label: 'Option A, with label way longer than container',
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
        label: 'Option D, with label way longer than container',
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

export const WithAutofocus: Story = () => (
    <Listbox
        options={options}
        onChange={(option) => console.info('onChange', option)}
        autofocus
    />
);

export const WithMultiselect: Story = () => (
    <Listbox
        checkIndicator
        defaultValue={['optionA', 'optionC']}
        multiselect
        options={options}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const WithCheck: Story = () => (
    <Listbox
        checkIndicator
        defaultValue="optionC"
        options={options}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const WithThreeItemsVisible: Story = () => (
    <Listbox
        options={options}
        onChange={(option) => console.info('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const WithoutOptionLabel: Story = () => (
    <Listbox
        options={optionsWithoutLabel}
        onChange={(option) => console.info('onChange', option)}
        numberOfItemsVisible={3}
    />
);

export const WithDisabledOptions: Story = () => {
    const disabledOptions = [
        {
            label: 'Option A',
            value: 'optionA',
        },
        {
            label: 'Option B',
            value: 'optionB',
            disabled: true,
        },
        {
            label: 'Option C',
            value: 'optionC',
            disabled: true,
        },
        {
            label: 'Option D',
            value: 'optionD',
        },
    ];

    return (
        <Listbox
            options={disabledOptions}
            onChange={(option) => console.info('onChange', option)}
        />
    );
};
