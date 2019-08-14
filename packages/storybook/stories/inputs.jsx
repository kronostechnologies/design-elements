import React from 'react';
import { storiesOf } from '@storybook/react';
import { TextInput } from '@equisoft/design-elements-react';

storiesOf('Input text fields', module)
    .add('Type: Text', () => (
        <TextInput
            id="ta_firstname"
            label="First Name"
            placeholder="Ex.: John"
            type="text"
        />
    ))
    .add('Type: Email', () => (
        <TextInput
            id="ta_email"
            label="Email"
            placeholder="Ex.: name@example.com"
            type="email"
        />
    ))
    .add('Type: Phone', () => (
        <TextInput
            id="ta_phone"
            label="Phone"
            placeholder="Ex.: 555-555-5555"
            type="tel"
        />
    ))
    .add('Default value', () => (
        <TextInput
            defaultValue="1234 Main Street"
            id="ta_address"
            label="Address"
        />
    ))
    .add('Required', () => (
        <TextInput
            id="ta_lastname"
            label="Last Name (required)"
            placeholder="Ex.: Doe"
            required
        />
    ))
    .add('Event callbacks', () => (
        <TextInput
            id="ta_lastname"
            label="See console for callbacks"
            onChange={(value) => console.log(`Custom function called on change. Current value: ${value}`)}
            onBlur={(value) => console.log(`Custom function called on blur. Current value: ${value}`)}
            onFocus={(value) => console.log(`Custom function called on focus. Current value: ${value}`)}
            placeholder="Ex.: Hello"
            required
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
        />
    ));
