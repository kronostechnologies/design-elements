import { Button, Listbox, ListboxOption } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';

export default {
    title: 'Controls/Listbox',
    component: Listbox,
};

const options = [
    { label: 'Option A', value: 'optionA' },
    { label: 'Option B', value: 'optionB' },
    { label: 'Option C', value: 'optionC' },
    { label: 'Option D', value: 'optionD', disabled: true },
    { label: 'Option E', value: 'optionE' },
    { label: 'Option F', value: 'optionF' },
    { label: 'Option G', value: 'optionG' },
];

export const Normal: Story = () => (
    <Listbox options={options} />
);

export const WithDefaultValue: Story = () => (
    <Listbox defaultValue="optionF" options={options} />
);

export const WithCaptions: Story = () => {
    const optionsWithCaptions = [
        { label: 'Option A', value: 'optionA', caption: 'The first one' },
        { label: 'Option B', value: 'optionB', caption: 'Why not this one?' },
        { label: 'Option C', value: 'optionC', caption: 'This one is also an option' },
    ];

    return (
        <Listbox options={optionsWithCaptions} />
    );
};

export const WithDisabledOptions: Story = () => {
    const disabledOptions = [
        { label: 'Option A', value: 'optionA' },
        { label: 'Option B', value: 'optionB', disabled: true },
        { label: 'Option C', value: 'optionC', disabled: true },
        { label: 'Option D', value: 'optionD' },
    ];

    return (
        <Listbox options={disabledOptions} />
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

export const WithCallbacks: Story = () => (
    <Listbox
        options={options}
        onFocusChange={(option) => console.info('onFocusChange', option)}
        onChange={(option) => console.info('onChange', option)}
    />
);

export const Multiselect: Story = () => (
    <Listbox
        defaultValue={['optionA', 'optionC']}
        multiselect
        options={options}
        onFocusChange={(option) => console.info('onFocusChange', option)}
        onChange={(option) => console.info('onChange', option)}
    />
);
