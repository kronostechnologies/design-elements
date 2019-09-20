import React from 'react';

import { TextInput } from '@equisoft/design-elements-react';
import { action } from '@storybook/addon-actions';
import { boolean, text } from '@storybook/addon-knobs';

export default {
    title: 'Input Text Fields',
    component: TextInput,
};

export const typeText = () => (
    <TextInput
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
        label={text('label', 'First Name')}
        placeholder={text('placeholder', 'Ex.: John')}
        type={text('type', 'text')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
    />
);
export const email = () => (
    <TextInput
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
        label={text('label', 'Email')}
        placeholder={text('placeholder', 'Ex.: name@example.com')}
        type={text('type', 'email')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
    />
);
export const phone = () => (
    <TextInput
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
        label={text('label', 'Phone')}
        placeholder={text('placeholder', 'Ex.: 555-555-5555')}
        type={text('type', 'tel')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
    />
);
export const defaultValue = () => (
    <TextInput
        disabled={boolean('disabled', false)}
        required={boolean('required', false)}
        label={text('label', 'Address')}
        placeholder={text('placeholder', 'Enter text here')}
        type={text('type', 'text')}
        defaultValue={text('defaultValue', '1234 Main Street')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
    />
);
export const required = () => (
    <TextInput
        disabled={boolean('disabled', false)}
        required={boolean('required', true)}
        label={text('label', 'Last Name (required)')}
        placeholder={text('placeholder', 'Ex.: Doe')}
        type={text('type', 'text')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
    />
);
export const eventCallbacks = () => (
    <TextInput
        disabled={boolean('disabled', false)}
        required={boolean('required', true)}
        label={text('label', 'See console for callbacks')}
        placeholder={text('placeholder', 'Ex.: Hello')}
        type={text('type', 'text')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
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
        disabled={boolean('disabled', false)}
        required={boolean('required', true)}
        label={text('label', 'Telephone')}
        placeholder={text('placeholder', 'Ex.: 555-123-4567')}
        type={text('type', 'tel')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '[0-9]{3}-?[0-9]{3}-?[0-9]{4}')}
        validationErrorMessage={text('validationErrorMessage', 'Please enter a valid phone number')}
    />
);
export const disabled = () => (
    <TextInput
        disabled={boolean('disabled', true)}
        required={boolean('required', false)}
        label={text('label', 'A disabled text input')}
        placeholder={text('placeholder', 'Sorry but this field is disabled')}
        type={text('type', 'text')}
        defaultValue={text('defaultValue', '')}
        pattern={text('pattern', '')}
        validationErrorMessage={text('validationErrorMessage', 'Error message')}
    />
);
