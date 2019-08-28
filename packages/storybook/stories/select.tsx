import { Select } from '@equisoft/design-elements-react';
import { storiesOf } from '@storybook/react';
import * as React from 'react';

const provinces = [
    { value: '', label: '-' },
    { value: 'on', label: 'Ontario' },
    { value: 'qc', label: 'Quebec' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'ab', label: 'Alberta' },
    { value: 'mb', label: 'Manitoba' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'yt', label: 'Yukon' },
];

const skipOption = {
    label: 'Skip this question',
    value: 'skip',
};

storiesOf('Select', module)
    .add('Default', () => (
        <Select
            label="Choose your province or territory"
            onChange={console.log}
            options={provinces}
        />
    ))
    .add('With Skip', () => (
        <Select
            label="Choose your province or territory"
            onChange={console.log}
            options={provinces}
            skipOption={skipOption}
        />
    ))
    .add('Required', () => (
        <Select
            label="Choose your province or territory"
            onChange={console.log}
            options={provinces}
            required
            skipOption={skipOption}
        />
    ));
