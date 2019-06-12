import React from 'react';
import { storiesOf } from '@storybook/react';
import { InputEmail, InputTelephone, InputText } from '@equisoft/design-elements-react';

storiesOf('Input text fields', module)
    .add('Normal', () => (
        <InputText
            id="ta_firstname"
            label="First Name"
            placeholder="Ex.: John"
        />
    ))
    .add('Optional', () => (
        <InputText
            optional
            id="ta_lastname"
            label="Last Name"
            optional="optional field"
            placeholder="Ex.: Doe"
        />
    ))
    .add('Phone (pattern validation)', () => (
        <InputTelephone
            defaultValue="555-987-6543"
            id="ta_phone"
            label="Telephone"
            pattern="[0-9]{3}-?[0-9]{3}-?[0-9]{4}"
            placeholder="Ex.: 555-123-4567"
            validMsg="Please enter a valid phone number"
        />
    ))
    .add('Disabled', () => (
        <InputText
            disabled
            id="ta_disabled"
            label="A disabled text input"
            placeholder="Sorry but this field is disabled"
        />
    ))
    .add('Email Error', () => (
        <InputEmail
            defaultValue="john.doe@.stld."
            id="ta_error"
            label="Email"
            valid={false} /* It's a way to force the error */
            validMsg="This is an invalid email format"
        />
    ));
