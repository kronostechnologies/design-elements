import { StepperInput, type StepperInputProps } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useEffect, useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

const FIGMA_LABEL = 'Label';
const FIGMA_DEFAULT_VALUE = 0;
const FIGMA_FILLED_VALUE = 50;
const FIGMA_ERROR_MESSAGE = 'This is an error message';
const FIGMA_MIN = 0;
const FIGMA_MAX = 10;

const StepperInputStory = (args: StepperInputProps): JSX.Element => {
    const isControlled = args.value !== undefined;
    const [value, setValue] = useState(args.value ?? args.defaultValue ?? FIGMA_DEFAULT_VALUE);

    useEffect(() => {
        if (isControlled && args.value !== undefined) {
            setValue(args.value);
        }
    }, [args.value, isControlled]);

    if (!isControlled) {
        return (
            <StepperInput
                // eslint-disable-next-line react/jsx-props-no-spreading
                {...args}
            />
        );
    }

    return (
        <StepperInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            value={value}
            onChange={(next) => setValue(next ?? 0)}
        />
    );
};

const StepperInputMeta: Meta<typeof StepperInput> = {
    title: 'Components/Stepper input',
    component: StepperInput,
    render: (args) => (
        <StepperInputStory
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        />
    ),
    args: {
        label: FIGMA_LABEL,
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

export const StateDefault: Story = {
    name: 'State — default',
    args: {
        value: FIGMA_DEFAULT_VALUE,
    },
};

export const StateFilled: Story = {
    name: 'State — filled',
    args: {
        value: FIGMA_FILLED_VALUE,
    },
};

export const StateDisabled: Story = {
    name: 'State — disabled',
    args: {
        disabled: true,
        value: FIGMA_DEFAULT_VALUE,
    },
};

export const StateError: Story = {
    name: 'State — error',
    args: {
        valid: false,
        validationErrorMessage: FIGMA_ERROR_MESSAGE,
        value: FIGMA_DEFAULT_VALUE,
    },
};

export const StateReadOnly: Story = {
    name: 'State — read only',
    args: {
        readOnly: true,
        value: FIGMA_FILLED_VALUE,
    },
};

export const StateDisabledUp: Story = {
    name: 'State — disabled up',
    args: {
        max: FIGMA_MAX,
        min: FIGMA_MIN,
        value: FIGMA_MAX,
    },
};

export const StateDisabledDown: Story = {
    name: 'State — disabled down',
    args: {
        max: FIGMA_MAX,
        min: FIGMA_MIN,
        value: FIGMA_MIN,
    },
};

export const StateDisabledAll: Story = {
    name: 'State — disabled all',
    args: {
        disabled: true,
        value: FIGMA_FILLED_VALUE,
    },
};

export const WithOnChangeCallback: Story = {
    parameters: rawCodeParameters,
    args: {
        onChange: (value: number) => console.info(value),
    },
};

export const WithToggletip: Story = {
    ...StepperInputMeta,
    args: {
        toggletip: {
            label: 'Toggletip label',
            children: 'Toggletip content',
        },
    },
};

export const RequiredWithText: Story = {
    args: {
        required: true,
        requiredLabelType: 'text',
    },
};

export const RequiredWithAsterisk: Story = {
    args: {
        required: true,
        requiredLabelType: 'asterisk',
    },
};
