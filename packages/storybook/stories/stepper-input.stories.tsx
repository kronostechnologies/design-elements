import { StepperInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Stepper input',
    component: StepperInput,
};

export const Default: Story = () => (
    <StepperInput label="Stepper input" />
);

export const WithOnChangeCallback: Story = () => (
    <StepperInput label="Stepper input" onChange={(value) => console.info(value)} />
);
WithOnChangeCallback.parameters = rawCodeParameters;
