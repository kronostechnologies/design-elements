import { StepperInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const StepperInputMeta: Meta<typeof StepperInput> = {
    title: 'Components/Stepper input',
    component: StepperInput,
    args: {
        label: 'Stepper input',
    },
    argTypes: {
        onBlur: {
            control: { disable: true },
        },
        onChange: {
            control: { disable: true },
        },
        onFocus: {
            control: { disable: true },
        },
        step: {
            control: {
                type: 'number',
                min: 0,
            },
        },
        value: {
            control: { type: 'number' },
        },
    },
};

export default StepperInputMeta;
type Story = StoryObj<typeof StepperInput>;

export const Default: Story = {};

export const WithOnChangeCallback: Story = {
    parameters: rawCodeParameters,
    args: {
        onChange: (value: number) => console.info(value),
    },
};
