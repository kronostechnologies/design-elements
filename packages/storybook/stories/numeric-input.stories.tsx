import { NumericInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Numeric Input',
    component: NumericInput,
};

export const Normal: Story = () => (
    <NumericInput
        label="Percentage"
        adornment="%"
        min={0}
        max={100}
        step={5}
        defaultValue="50"
    />
);

export const Adornment: Story = () => (
    <>
        <NumericInput
            label="Start"
            adornment="%"
            adornmentPosition="start"
            defaultValue="50"
        />
        <NumericInput
            label="End"
            adornment="%"
            adornmentPosition="end"
            defaultValue="50"
        />
        <NumericInput
            label="Period"
            textAlign="right"
            adornmentPosition="end"
            adornment="years"
            defaultValue="5"
        />
    </>
);

export const WithoutLabel: Story = () => (
    <NumericInput
        adornment="%"
        adornmentPosition="start"
        defaultValue="50"
    />
);

export const MinMaxStep: Story = () => (
    <NumericInput
        label="Percentage"
        adornment="%"
        min={0}
        max={100}
        step={5}
        defaultValue="50"
    />
);

export const ControlledValue: Story = () => {
    const [inputValue, setInputValue] = useState<number | null>(50);
    return (
        <NumericInput
            label="Percentage"
            adornment="%"
            onChange={setInputValue}
            value={inputValue ?? ''}
        />
    );
};
ControlledValue.parameters = rawCodeParameters;

export const Disabled: Story = () => (
    <NumericInput
        label="Percentage"
        adornment="%"
        disabled
        defaultValue={100}
    />
);

export const Invalid: Story = () => (
    <NumericInput
        label="Percentage"
        adornment="%"
        valid={false}
        validationErrorMessage="This is an error message"
        defaultValue={100}
    />
);
