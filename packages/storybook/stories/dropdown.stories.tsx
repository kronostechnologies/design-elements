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
    <Dropdown label="Select an option" options={options}/>
);

export const disabled = () => (
    <Dropdown label="Select an option" options={options} disabled/>
);
export const invalid = () => (
    <Dropdown label="Select an option" options={options} valid={false}/>
);
export const required = () => (
    <form onSubmit={event => event.preventDefault()}>
        <Dropdown label="Select an option" options={options}/>
        <button type="submit">Submit</button>
    </form>
);
export const withTwoItemsVisible = () => (
    <Dropdown label="Select an option" options={options} numberOfItemsVisible={2}/>
);
export const searchable = () => (
    <Dropdown label="Select an option" options={options} searchable/>
);
export const withCallback = () => (
    <Dropdown label="Select an option" options={options} onChange={(option) => console.log(`Label: ${option.label} | Value: ${option.value}`)}/>
);
export const withoutLabel = () => (
    <Dropdown options={options}/>
);
export const withSkip = () => (
    <Dropdown label="Select an option" options={options} skipOption={skipOption} searchable/>
);
