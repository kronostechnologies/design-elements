import React, { ReactElement } from 'react';
import styled from 'styled-components';

import { Dropdown } from '@equisoft/design-elements-react';

const Container = styled.div`
    height: 200px;
`;

const options = [
    {
        label: 'Option A',
        value: 'optionA',
    },
    {
        label: 'Option B',
        value: 'optionB',
    },
    {
        label: 'Option C',
        value: 'optionC',
    },
    {
        label: 'Option D',
        value: 'optionD',
    },
];

export default {
    title: 'Dropdown',
    component: Dropdown,
    decorators: [(storyFn: () => ReactElement) => <Container>{storyFn()}</Container>],
};

export const normal = () => (
    <Dropdown options={options}/>
);

export const disabled = () => (
    <Dropdown options={options} disabled/>
);
export const invalid = () => (
    <Dropdown options={options} valid={false}/>
);
export const scrollable = () => (
    <Dropdown options={options} scrollable/>
);
export const searchable = () => (
    <Dropdown options={options} searchable/>
);
export const withCallback = () => (
    <Dropdown options={options} onChange={(option) => console.log(`Label: ${option.label} | Value: ${option.value}`)}/>
);
