import { TextInput } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Input Text Fields',
    component: TextInput,
};

export const inputs = () => (
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
export const defaultValue = () => (
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
export const required = () => (
    <TextInput
        disabled={false}
        required={true}
        label="Last Name (required)"
        type="text"
        defaultValue=""
        pattern=""
        validationErrorMessage="This field is required"
    />
);
export const eventCallbacks = () => (
    <TextInput
        disabled={false}
        required={true}
        label="See console for callbacks"
        type="text"
        defaultValue=""
        pattern=""
        validationErrorMessage="Error message"
        onChange={event => {
            console.log(`Custom function called on change. Current value: ${event.currentTarget.value}`);
        }}
        onBlur={event => {
            console.log(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
        }}
        onFocus={event => {
            console.log(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
        }}
    />
);
export const patternValidation = () => (
    <TextInput
        disabled={false}
        required={true}
        label="Telephone"
        placeholder="Ex.: 555-123-4567"
        type="tel"
        defaultValue=""
        pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
        validationErrorMessage="Please enter a valid phone number"
    />
);
export const disabled = () => (
    <TextInput
        disabled={true}
        required={false}
        label="A disabled text input"
        placeholder="Sorry but this field is disabled"
        type="text"
        defaultValue=""
        pattern=""
        validationErrorMessage="Error message"
    />
);
