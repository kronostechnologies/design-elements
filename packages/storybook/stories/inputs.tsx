import * as React from 'react';

import { TextInput } from '@equisoft/design-elements-react';
import { boolean, text, withKnobs } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const stories = storiesOf('Input text fields', module);
stories.addDecorator(withKnobs);

stories.add('Type: Text', () => (
        <TextInput
            id={text('id', 'ta_firstname')}
            label={text('label', 'First Name')}
            placeholder={text('placeholder', 'Ex.: John')}
            type={text('type', 'text')}
            validMsg={text('validMsg', 'Error message')}
        />
    ))
    .add('Type: Email', () => (
        <TextInput
            id={text('id', 'ta_email')}
            label={text('label', 'Email')}
            placeholder={text('placeholder', 'Ex.: name@example.com')}
            type={text('type', 'email')}
            validMsg={text('validMsg', 'Error message')}
        />
    ))
    .add('Type: Phone', () => (
        <TextInput
            id={text('id', 'ta_phone')}
            label={text('label', 'Phone')}
            placeholder={text('placeholder', 'Ex.: 555-555-5555')}
            type={text('type', 'tel')}
            validMsg={text('validMsg', 'Error message')}
        />
    ))
    .add('Default value', () => (
        <TextInput
            defaultValue={text('defaultValue', '1234 Main Street')}
            id={text('id', 'ta_address')}
            label={text('label', 'Address')}
            validMsg={text('validMsg', 'Error message')}
        />
    ))
    .add('Required', () => (
        <TextInput
            id={text('id', 'ta_lastname')}
            label={text('label', 'Last Name (required)')}
            placeholder={text('placeholder', 'Ex.: Doe')}
            required={boolean('required', true)}
            validMsg={text('validMsg', 'Error message')}
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
            validMsg={text('validMsg', 'This field is required')}
        />
    ))
    .add('Pattern validation', () => (
        <TextInput
            id={text('id', 'ta_phone')}
            label={text('label', 'Telephone')}
            pattern={text('pattern', '[0-9]{3}-?[0-9]{3}-?[0-9]{4}')}
            placeholder={text('placeholder', 'Ex.: 555-123-4567')}
            type={text('type', 'tel')}
            validMsg={text('validMsg', 'Please enter a valid phone number')}
        />
    ))
    .add('Disabled', () => (
        <TextInput
            disabled={boolean('disabled', true)}
            id={text('id', 'ta_disabled')}
            label={text('label', 'A disabled text input')}
            placeholder={text('placeholder', 'Sorry but this field is disabled')}
            validMsg={text('validMsg', 'Error message')}
        />
    ));
