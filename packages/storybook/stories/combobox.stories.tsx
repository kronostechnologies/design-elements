import { Combobox } from '@equisoft/design-elements-react';
import React, { ReactElement } from 'react';
import styled from 'styled-components';

const Container = styled.div`
    height: 240px;
`;

export default {
    title: 'Combobox',
    component: Combobox,
    decorators: [(storyFn: () => ReactElement) => <Container>{storyFn()}</Container>],
};

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

export const normal = () => (
    <Combobox label="Select an option" options={provinces}/>
);

export const customPlaceholder = () => (
    <Combobox label="Select an option" options={provinces} placeholder="Custom placeholder"/>
);
export const disabled = () => (
    <Combobox label="Select an option" options={provinces} disabled/>
);
export const invalid = () => (
    <Combobox label="Select an option" options={provinces} valid={false}/>
);
export const mobile = () => (
    <Combobox label="Select an option" options={provinces} device="mobile"/>
);
export const required = () => (
    <form onSubmit={event => event.preventDefault()}>
        <Combobox label="Select an option" options={provinces} required/>
        <button type="submit">Submit</button>
    </form>
);
export const withCallback = () => (
    <Combobox label="Select an option" options={provinces} onChange={(option) => console.log(`Label: ${option.label} | Value: ${option.value}`)}/>
);
export const withDefaultValue = () => (
    <Combobox label="Select an option" options={provinces} defaultValue="qc"/>
);
export const withoutLabel = () => (
    <Combobox options={provinces}/>
);
export const withSkip = () => (
    <Combobox label="Select an option" options={provinces} skipOption={skipOption}/>
);
export const withTwoItemsVisible = () => (
    <Combobox label="Select an option" options={provinces} numberOfItemsVisible={2}/>
);
