import { Select } from '@equisoft/design-elements-react';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 240px;
`;

const provinces = [
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
    decorators: [(storyFn: () => ReactElement) => <Container>{storyFn()}</Container>],
};

export const normal = () => (
    <Select label="Select an option" options={provinces}/>
);

export const customPlaceholder = () => (
    <Select label="Select an option" options={provinces} placeholder="Custom placeholder"/>
);
export const disabled = () => (
    <Select label="Select an option" options={provinces} disabled/>
);
export const invalid = () => (
    <Select label="Select an option" options={provinces} valid={false}/>
);
export const required = () => (
    <form onSubmit={event => event.preventDefault()}>
        <Select label="Select an option" options={provinces}/>
        <button type="submit">Submit</button>
    </form>
);
export const searchable = () => (
    <Select label="Select an option" options={provinces} searchable/>
);
export const withCallback = () => (
    <Select label="Select an option" options={provinces} onChange={(option) => console.log(`Label: ${option.label} | Value: ${option.value}`)}/>
);
export const withDefaultValue = () => (
    <Select label="Select an option" options={provinces} defaultValue="qc"/>
);
export const withoutLabel = () => (
    <Select options={provinces}/>
);
export const withSkip = () => (
    <Select label="Select an option" options={provinces} skipOption={skipOption}/>
);
export const withTwoItemsVisible = () => (
    <Select label="Select an option" options={provinces} numberOfItemsVisible={2}/>
);
