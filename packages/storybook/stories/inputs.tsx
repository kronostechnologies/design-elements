import * as React from 'react';

import { TextInput } from '@equisoft/design-elements-react';
import { boolean, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

storiesOf('Input text fields', module)
    .add('Type: Text', () => (
        <TextInput
            label={text('label', 'First Name')}
            placeholder={text('placeholder', 'Ex.: John')}
            type={text('type', 'text')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ))
    .add('Type: Email', () => (
        <TextInput
            label={text('label', 'Email')}
            placeholder={text('placeholder', 'Ex.: name@example.com')}
            type={text('type', 'email')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ))
    .add('Type: Phone', () => (
        <TextInput
            label={text('label', 'Phone')}
            placeholder={text('placeholder', 'Ex.: 555-555-5555')}
            type={text('type', 'tel')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ))
    .add('Default value', () => (
        <TextInput
            defaultValue={text('defaultValue', '1234 Main Street')}
            label={text('label', 'Address')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ))
    .add('Required', () => (
        <TextInput
            label={text('label', 'Last Name (required)')}
            placeholder={text('placeholder', 'Ex.: Doe')}
            required={boolean('required', true)}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ))
    .add('Event callbacks', () => (
        <TextInput
            label={text('label', 'See console for callbacks')}
            onChange={(event) => {
                console.log(`Custom function called on change. Current value: ${event.currentTarget.value}`);
            }}
            onBlur={(event) => {
                console.log(`Custom function called on blur. Current value: ${event.currentTarget.value}`);
            }}
            onFocus={(event) => {
                console.log(`Custom function called on focus. Current value: ${event.currentTarget.value}`);
            }}
            placeholder={text('placeholder', 'Ex.: Hello')}
            required={boolean('required', true)}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ))
    .add('Pattern validation', () => (
        <TextInput
            label={text('label', 'Telephone')}
            pattern={text('pattern', '[0-9]{3}-?[0-9]{3}-?[0-9]{4}')}
            placeholder={text('placeholder', 'Ex.: 555-123-4567')}
            type={text('type', 'tel')}
            validationErrorMessage={text('validationErrorMessage', 'Please enter a valid phone number')}
        />
    ))
    .add('Disabled', () => (
        <TextInput
            disabled={boolean('disabled', true)}
            label={text('label', 'A disabled text input')}
            placeholder={text('placeholder', 'Sorry but this field is disabled')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
        />
    ));
