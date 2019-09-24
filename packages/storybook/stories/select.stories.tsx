import React from 'react';

import { Select } from '@equisoft/design-elements-react';

const provinces = [
    { value: '', label: '-' },
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
    {  value: 'yt', label: 'Yukon' },
];

const skipOption = {
    label: 'Skip this question',
    value: 'skip',
};

export default {
    title: 'Select',
    component: Select,
};

export const normal = () => (
    <Select
        label="Choose your province or territory"
        name="provinces"
        validationErrorMessage="Error message"
        onChange={(value) => {console.log(value); }}
        required={false}
        options={provinces}
    />
);
export const controlledValue = () => (
    <Select
        label="Choose your province or territory"
        value="on"
        name="provinces"
        validationErrorMessage="Error message"
        onChange={(value) => {console.log(value); }}
        required={false}
        options={provinces}
    />
);
export const withSkip = () => (
    <Select
        label="Choose your province or territory"
        name="provinces"
        validationErrorMessage="Error message"
        onChange={console.log}
        required={false}
        options={provinces}
        skipOption={skipOption}
    />
);
export const required = () => (
    <Select
        label="Choose your province or territory"
        name="provinces"
        validationErrorMessage="Error message"
        onChange={console.log}
        required={true}
        options={provinces}
    />
);
