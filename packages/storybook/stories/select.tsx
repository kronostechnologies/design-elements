import { storiesOf } from '@storybook/react';
import * as React from 'react';

import { Select } from '@equisoft/design-elements-react';
import { boolean, object, text, withKnobs } from '@storybook/addon-knobs';

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

const stories = storiesOf('Select', module);
stories.addDecorator(withKnobs);

stories.add('Default', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            onChange={(value) => {console.log(value); }}
            options={object('options', provinces)}
        />
    ))
    .add('With Skip', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            onChange={console.log}
            options={object('options', provinces)}
            skipOption={object('skipOption', skipOption)}
        />
    ))
    .add('Required', () => (
        <Select
            label={text('label', 'Choose your province or territory')}
            onChange={console.log}
            options={object('options', provinces)}
            required={boolean('required', true)}
            skipOption={object('skipOption', skipOption)}
        />
    ));
