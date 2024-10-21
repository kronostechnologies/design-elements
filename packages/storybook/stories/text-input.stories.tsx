import {
    Button,
    Icon,
    MoneyInput,
    NumericInput,
    PhoneInput, StepperInput,
    TextArea,
    TextInput,
} from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const TextInputMeta: Meta<typeof TextInput> = {
    title: 'Components/Text Input',
    component: TextInput,
    args: {
        type: 'text',
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
        onKeyDown: {
            control: { disable: true },
        },
        onKeyUp: {
            control: { disable: true },
        },
        onMouseUp: {
            control: { disable: true },
        },
        value: {
            control: { type: 'text' },
        },
    },
};

export default TextInputMeta;
type Story = StoryObj<typeof TextInput>;

export const Default: Story = {
    ...TextInputMeta,
    args: {
        label: 'First Name',
        validationErrorMessage: 'Error message',
        hint: 'Hint',
    },
};

export const Required: Story = {
    ...TextInputMeta,
    args: {
        validationErrorMessage: 'This field is required',
        required: true,
        valid: undefined,
    },
    render: (args) => (
        <form>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            <TextInput label='Text Field' {...args} />
            <MoneyInput
                label='Money Field'
                validationErrorMessage={args.validationErrorMessage}
                required={args.required}
                // valid={args.valid}
            />
            <NumericInput
                label='Numeric Field'
                validationErrorMessage={args.validationErrorMessage}
                required={args.required}
                // invalid={!args.valid}
            />
            <PhoneInput
                label='Phone Field'
                pattern="(___) ___-____"
                validationErrorMessage={args.validationErrorMessage}
                required={args.required}
                // valid={args.valid}
            />
            <TextArea
                label='Text Area'
                validationErrorMessage={args.validationErrorMessage}
                required={args.required}
                valid={args.valid}
            />
            <StepperInput
                label='Stepper Field'
                validationErrorMessage={args.validationErrorMessage}
                required={args.required}
                valid={args.valid}
            />
            <Button buttonType='primary' type='submit'>Submit</Button>
        </form>
        ),
};

export const IconAsAdornment: Story = {
    ...TextInputMeta,
    args: {
        label: 'First Name',
        validationErrorMessage: 'Error message',
        leftAdornment: <Icon name='user' />,
        hint: 'Hint',
    },
};

export const TextAsAdornment: Story = {
    ...TextInputMeta,
    args: {
        label: 'First Name',
        validationErrorMessage: 'Error message',
        rightAdornment: '%',
        hint: 'Hint',
    },
};

export const EventCallbacks: Story = {
    ...TextInputMeta,
    parameters: rawCodeParameters,
    args: {
        required: true,
        label: 'See console for callbacks',
        onBlur: (event) => {
            console.info(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        },
        onChange: (event) => {
            console.info(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        },
        onFocus: (event) => {
            console.info(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        },
    },
};
