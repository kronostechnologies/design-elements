import React from 'react';
import { storiesOf } from '@storybook/react';
import { InputEmail, InputTelephone, TextInput } from '@equisoft/design-elements-react';

storiesOf('Input text fields', module)
    .add('Normal', () => (
        <TextInput
            id="ta_firstname"
            label="First Name"
            placeholder="Ex.: John"
        />
    ))
    .add('Required', () => (
        <TextInput
            id="ta_lastname"
            label="Last Name"
            placeholder="Ex.: Doe"
            required
        />
    ))
    .add('Phone (pattern validation)', () => (
        <TextInput
            defaultValue="555-987-6543"
            id="ta_phone"
            label="Telephone"
            pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
            placeholder="Ex.: 555-123-4567"
            required
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
    ))
    .add('Email Error', () => (
        <TextInput
            defaultValue="john.doe@.stld."
            id="ta_error"
            label="Email"
            required
            type="email"
            valid={false} /* It's a way to force the error */
            validMsg="This is an invalid email format"
        />
    ));
