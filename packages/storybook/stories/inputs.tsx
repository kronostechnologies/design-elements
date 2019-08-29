import * as React from 'react';
import { storiesOf } from '@storybook/react';
import { TextInput } from '@equisoft/design-elements-react';

storiesOf('Input text fields', module)
    .add('Type: Text', () => (
        <TextInput
            label="First Name"
            placeholder="Ex.: John"
            type="text"
        />
    ))
    .add('Type: Email', () => (
        <TextInput
            label="Email"
            placeholder="Ex.: name@example.com"
            type="email"
        />
    ))
    .add('Type: Phone', () => (
        <TextInput
            label="Phone"
            placeholder="Ex.: 555-555-5555"
            type="tel"
        />
    ))
    .add('Default value', () => (
        <TextInput
            defaultValue="1234 Main Street"
            label="Address"
        />
    ))
    .add('Required', () => (
        <TextInput
            label="Last Name (required)"
            placeholder="Ex.: Doe"
            required
            validMsg="This field is required"
        />
    ))
    .add('Event callbacks', () => (
        <TextInput
            label="See console for callbacks"
            changeCallback={(value) => console.log(`Custom function called on change. Current value: ${value}`)}
            blurCallback={(value) => console.log(`Custom function called on blur. Current value: ${value}`)}
            focusCallback={(value) => console.log(`Custom function called on focus. Current value: ${value}`)}
            placeholder="Ex.: Hello"
            required
            validMsg="This field is required"
        />
    ))
    .add('Pattern validation', () => (
        <TextInput
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
            label="A disabled text input"
            placeholder="Sorry but this field is disabled"
        />
    ));
