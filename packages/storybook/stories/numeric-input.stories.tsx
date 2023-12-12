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
        label="Number"
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
            textAlign="right"
            defaultValue="50"
        />
        <NumericInput
            label="Text"
            adornmentPosition="end"
            adornment="years"
            textAlign="right"
            defaultValue="5"
        />
    </>
);

export const WithoutLabel: Story = () => (
    <NumericInput defaultValue="50" />
);

export const MinimumAndMaximum: Story = () => (
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
        label="Label"
        required
    />
);

export const Precision: Story = () => (
    <>
        <NumericInput
            label="Label (precision = 0)"
            precision={0}
        />
        <NumericInput
            label="Label (precision = 2)"
            precision={2}
        />
    </>
);

export const ControlledValue: Story = () => {
    const [inputValue, setInputValue] = useState('50');
    return (
        <NumericInput
            label="Label"
            onChange={(_event, { value, valueAsNumber }) => {
                setInputValue(value);
                console.info(`NumericInput onChange value: ${value}`);
                console.info(`NumericInput onChange valueAsNumber: ${valueAsNumber}`);
            }}
            onBlur={(_event, { value, valueAsNumber }) => {
                console.info(`NumericInput onBlur value: ${value}`);
                console.info(`NumericInput onBlur valueAsNumber: ${valueAsNumber}`);
            }}
            value={inputValue}
        />
    );
};
ControlledValue.parameters = rawCodeParameters;

export const Disabled: Story = () => (
    <NumericInput
        label="Label"
        disabled
        defaultValue={100}
    />
);

export const ExplicitInvalid: Story = () => (
    <>
        <NumericInput
            label="Label"
            invalid
            validationErrorMessage="This is a custom error message"
            defaultValue={100}
        />
        <NumericInput
            invalid
            defaultValue={100}
        />
    </>
);
