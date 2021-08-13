import { StepperInput } from '@equisoft/design-elements-react';
import React, { useState } from 'react';
import { Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Stepper input',
    component: StepperInput,
};

export const Normal: Story = () => (
    <StepperInput label="Stepper input" />
);

type Value = number | undefined | null;

export const Controlled: Story = () => {
    const [inputValue, setInputValue] = useState<Value>(null);

    return (
        <StepperInput label="Stepper input" onChange={setInputValue} value={inputValue} />
    );
};
Controlled.parameters = rawCodeParameters;

export const WithDefaultValue: Story = () => (
    <StepperInput label="Stepper input" defaultValue={0} />
);

export const WithCustomStep: Story = () => (
    <StepperInput label="Stepper input" step={5} />
);

export const WithMaxValue: Story = () => (
    <StepperInput label="Stepper input" max={5} />
);

export const WithMinValue: Story = () => (
    <StepperInput label="Stepper input" min={0} />
);

export const Invalid: Story = () => (
    <StepperInput valid={false} label="Stepper input" />
);

export const Disabled: Story = () => (
    <StepperInput label="Stepper input" disabled />
);

export const WithOnChangeCallback: Story = () => (
    <StepperInput label="Stepper input" onChange={(value) => console.info(value)} />
);
WithOnChangeCallback.parameters = rawCodeParameters;
