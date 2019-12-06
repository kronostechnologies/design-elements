import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Dropdown } from '@equisoft/design-elements-react';

const Container = styled.div`
    height: 200px;
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
    title: 'Dropdown',
    component: Dropdown,
    decorators: [(storyFn: () => ReactElement) => <Container>{storyFn()}</Container>],
};

export const normal = () => (
    <Dropdown label="Select an option" options={provinces}/>
);

export const disabled = () => (
    <Dropdown label="Select an option" options={provinces} disabled/>
);
export const invalid = () => (
    <Dropdown label="Select an option" options={provinces} valid={false}/>
);
export const required = () => (
    <form onSubmit={event => event.preventDefault()}>
        <Dropdown label="Select an option" options={provinces}/>
        <button type="submit">Submit</button>
    </form>
);
export const withTwoItemsVisible = () => (
    <Dropdown label="Select an option" options={provinces} numberOfItemsVisible={2}/>
);
export const searchable = () => (
    <Dropdown label="Select an option" options={provinces} searchable/>
);
export const withCallback = () => (
    <Dropdown label="Select an option" options={provinces} onChange={(option) => console.log(`Label: ${option.label} | Value: ${option.value}`)}/>
);
export const withoutLabel = () => (
    <Dropdown options={provinces}/>
);
export const withSkip = () => (
    <Dropdown label="Select an option" options={provinces} skipOption={skipOption} searchable/>
);
export const withDefaultValue = () => (
    <Dropdown label="Select an option" options={provinces} defaultValue="qc"/>
);
