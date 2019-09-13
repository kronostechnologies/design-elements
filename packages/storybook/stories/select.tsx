import React from 'react';

import { Select } from '@equisoft/design-elements-react';
import { boolean, object, text } from '@storybook/addon-knobs';
import { storiesOf } from '@storybook/react';

const provinces = [{ value: '', label: '-' },
                   {  value: 'on', label: 'Ontario' },
                   {  value: 'qc', label: 'Quebec' },
                   {  value: 'bc', label: 'British Columbia' },
                   {  value: 'ab', label: 'Alberta' },
                   {  value: 'mb', label: 'Manitoba' },
                   {  value: 'sk', label: 'Saskatchewan' },
                   {  value: 'ns', label: 'Nova Scotia' },
                   {  value: 'nb', label: 'New Brunswick' },
                   {  value: 'nl', label: 'Newfoundland and Labrador' },
                   {  value: 'pe', label: 'Prince Edward Island' },
                   {  value: 'nt', label: 'Northwest Territories' },
                   {  value: 'nu', label: 'Nunavut' },
                   {  value: 'yt', label: 'Yukon' }];

const skipOption = {
    label: 'Skip this question',
    value: 'skip',
};

storiesOf('Select', module)
    .add('Default', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            value={text('value', '')}
            name={text('name', 'provinces')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            onChange={(value) => {console.log(value); }}
            required={boolean('required', false)}
            valid={boolean('valid', true)}
            options={object('options', provinces)}
        />
    ))
    .add('With Value', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            value={text('value', 'on')}
            name={text('name', 'provinces')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            onChange={(value) => {console.log(value); }}
            required={boolean('required', false)}
            valid={boolean('valid', true)}
            options={object('options', provinces)}
        />
    ))
    .add('With Skip', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            value={text('value', '')}
            name={text('name', 'provinces')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            onChange={console.log}
            required={boolean('required', false)}
            valid={boolean('valid', true)}
            options={object('options', provinces)}
            skipOption={object('skipOption', skipOption)}
        />
    ))
    .add('Required', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            value={text('value', '')}
            name={text('name', 'provinces')}
            validationErrorMessage={text('validationErrorMessage', 'Error message')}
            onChange={console.log}
            required={boolean('required', true)}
            valid={boolean('valid', true)}
            options={object('options', provinces)}
            skipOption={object('skipOption', skipOption)}
        />
    ));
