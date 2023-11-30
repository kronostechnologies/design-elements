import { NumericInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Controls/Numeric Input',
    component: NumericInput,
};

export const Normal: Story = () => (
    <NumericInput
        label="Percentage"
        adornment="%"
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

export const MinimumMaximum: Story = () => (
    <>
        <NumericInput
            label="Percentage"
            hint="Minimum 0 - Maximum 100"
            adornment="%"
            min={0}
            max={100}
        />
        <NumericInput
            label="Quantity"
            hint="Minimum 5"
            adornment="Qty"
            min={5}
        />
    </>
);

export const Required: Story = () => (
    <NumericInput
        label="Percentage"
        adornment="%"
        required
    />
);

export const Precision: Story = () => (
    <>
        <NumericInput
            label="Percentage (precision = 0)"
            adornment="%"
            precision={0}
        />
        <NumericInput
            label="Percentage (precision = 2)"
            adornment="%"
            precision={2}
        />
    </>
);

export const ControlledValue: Story = () => {
    const [inputValue, setInputValue] = useState('50');
    return (
        <NumericInput
            label="Percentage"
            adornment="%"
            onChange={(event, valueAsNumber) => {
                setInputValue(event.target.value);
                console.info(`NumericInput onChange value: ${event.target.value}`);
                console.info(`NumericInput onChange valueAsNumber: ${valueAsNumber}`);
            }}
            onBlur={(event, valueAsNumber) => {
                console.info(`NumericInput onBlur value: ${event.target.value}`);
                console.info(`NumericInput onBlur valueAsNumber: ${valueAsNumber}`);
            }}
            value={inputValue}
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

export const ExplicitInvalid: Story = () => (
    <>
        <NumericInput
            label="Percentage"
            adornment="%"
            invalid
            validationErrorMessage="This is an custom error message"
            defaultValue={100}
        />
        <NumericInput
            adornment="%"
            invalid
            defaultValue={100}
        />
    </>
);
