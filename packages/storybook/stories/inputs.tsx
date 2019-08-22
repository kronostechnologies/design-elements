import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextInput } from '@equisoft/design-elements-react';

storiesOf('Input text fields', module)
    .add('Type: Text', () => (
        <TextInput
            id="ta_firstname"
            label="First Name"
            placeholder="Ex.: John"
            type="text"
            validMsg='Temporary Message'
        />
    ))
    .add('Type: Email', () => (
        <TextInput
            id="ta_email"
            label="Email"
            placeholder="Ex.: name@example.com"
            type="email"
            validMsg='Temporary Message'
        />
    ))
    .add('Type: Phone', () => (
        <TextInput
            id="ta_phone"
            label="Phone"
            placeholder="Ex.: 555-555-5555"
            type="tel"
            validMsg='Temporary Message'
        />
    ))
    .add('Default value', () => (
        <TextInput
            defaultValue="1234 Main Street"
            id="ta_address"
            label="Address"
            validMsg='Temporary Message'
        />
    ))
    .add('Required', () => (
        <TextInput
            id="ta_lastname"
            label="Last Name (required)"
            placeholder="Ex.: Doe"
            required
            validMsg='Temporary Message'
        />
    ))
    .add('Event callbacks', () => (
        <TextInput
            id="ta_lastname"
            label="See console for callbacks"
            changeCallback={(value) => console.log(`Custom function called on change. Current value: ${value}`)}
            blurCallback={(value) => console.log(`Custom function called on blur. Current value: ${value}`)}
            focusCallback={(value) => console.log(`Custom function called on focus. Current value: ${value}`)}
            placeholder="Ex.: Hello"
            required
            validMsg='Temporary Message'
        />
    ))
    .add('Pattern validation', () => (
        <TextInput
            id="ta_phone"
            label="Telephone"
            pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
            placeholder="Ex.: 555-123-4567"
            type="tel"
            validMsg="Please enter a valid phone number"
        />
    ))
    .add('Disabled', () => (
        <TextInput
            disabled
            id="ta_disabled"
            label="A disabled text input"
            placeholder="Sorry but this field is disabled"
            validMsg='Temporary Message'
        />
    ));
