import { Button, Listbox, ListboxOption } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

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
        disabled: true,
    },
    {
        label: 'Option E',
        value: 'optionE',
    },
    {
        label: 'Option F',
        value: 'optionF',
    },
    {
        label: 'Option G',
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

const optionsWithCaptions = [
    {
        label: 'Option A',
        value: 'optionA',
        caption: 'The first one',
    },
    {
        label: 'Option B',
        value: 'optionB',
        caption: 'Why not this one?',
    },
    {
        label: 'Option C',
        value: 'optionC',
        caption: 'This one is also an option',
    },
];

export const Normal: Story = () => (
    <Listbox
        options={options}
        onChange={(option) => console.info('onChange', option)}
        onFocusChange={(option) => console.info('onFocusChange', option)}
    />
);

export const WithDefaultValue: Story = () => (
    <Listbox
        defaultValue="optionF"
        options={options}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const WithMultiselect: Story = () => (
    <Listbox
        defaultValue={['optionA', 'optionC']}
        multiselect
        options={options}
        onChange={(option) => console.info('onChange', option)}
        onFocusChange={(option) => console.info('onFocusChange', option)}
    />
);

export const WithoutOptionLabel: Story = () => (
    <Listbox
        options={optionsWithoutLabel}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const WithCaptions: Story = () => (
    <Listbox
        options={optionsWithCaptions}
        onChange={(option) => console.info('onChange', option)}
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

export const WithControlledValue: Story = () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    function handleChange(option: ListboxOption): void {
        setValue(option.value);
    }

    const StyledButton = styled(Button)`
        margin-top: 1rem;
    `;

    return (
        <>
            <Listbox options={options} onChange={handleChange} value={value} />
            <StyledButton buttonType="primary" onClick={() => setValue('optionC')}>
                Set value to Option C
            </StyledButton>
        </>
    );
};
