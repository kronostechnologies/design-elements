import { TextInput } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Input Text Fields',
    component: TextInput,
};

export const Inputs: Story = () => (
    <div>
        <TextInput
            disabled={false}
            required={false}
            label="First Name"
            type="text"
            defaultValue=""
            pattern=""
            validationErrorMessage="Error message"
            hint="Hint"
        />
        <TextInput
            disabled={false}
            required={false}
            label="Email"
            placeholder="you@example.com"
            type="email"
            defaultValue=""
            pattern=""
            validationErrorMessage="Error message"
            hint="Hint"
        />
        <TextInput
            disabled={false}
            required={false}
            label="Phone"
            placeholder="Ex.: 555-555-5555"
            type="tel"
            defaultValue=""
            pattern=""
            validationErrorMessage="Error message"
            hint="Hint"
        />
    </div>
);
export const DefaultValue: Story = () => (
    <TextInput
        disabled={false}
        required={false}
        label="Address"
        type="text"
        defaultValue="1234 Main Street"
        pattern=""
        validationErrorMessage="Error message"
    />
);
export const Required: Story = () => (
    <TextInput
        disabled={false}
        required
        label="Last Name (required)"
        type="text"
        defaultValue=""
        pattern=""
        validationErrorMessage="This field is required"
    />
);
export const EventCallbacks: Story = () => (
    <TextInput
        disabled={false}
        required
        label="See console for callbacks"
        type="text"
        defaultValue=""
        pattern=""
        validationErrorMessage="Error message"
        onChange={(event) => {
            console.info(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        }}
        onBlur={(event) => {
            console.info(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        }}
        onFocus={(event) => {
            console.info(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        }}
    />
);
export const PatternValidation: Story = () => (
    <TextInput
        disabled={false}
        required
        label="Telephone"
        placeholder="Ex.: 555-123-4567"
        type="tel"
        defaultValue=""
        pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
        validationErrorMessage="Please enter a valid phone number"
    />
);
export const Disabled: Story = () => (
    <TextInput
        disabled
        required={false}
        label="A disabled text input"
        placeholder="Sorry but this field is disabled"
        type="text"
        defaultValue=""
        pattern=""
        validationErrorMessage="Error message"
    />
);
