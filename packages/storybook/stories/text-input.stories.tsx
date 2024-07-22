import { Icon, TextInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const TextInputMeta: Meta<typeof TextInput> = {
    title: 'Components/Text Input',
    component: TextInput,
    args: {
        type: 'text',
        adornment: '%',
    },
    argTypes: {
        adornment: {
            control: { disable: true },
        },
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

export const IconAsAdornment: Story = {
    ...TextInputMeta,
    args: {
        label: 'First Name',
        validationErrorMessage: 'Error message',
        adornment: <Icon name="user" />,
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
