import { Select } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const Container = styled.div`
    height: 240px;
`;

const provinces = [
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

export default {
    title: 'Controls/Select',
    component: Select,
    decorators: [decorateWith(Container)],
};

export const Normal: Story = () => (
    <Select label="Select an option" hint="Hint" options={provinces} />
);

export const InsideShadowDom: Story = () => (
    <Select label="Select an option" hint="Hint" options={provinces} />
);
InsideShadowDom.decorators = [ShadowDomDecorator];

export const CustomPlaceholder: Story = () => (
    <Select label="Select an option" options={provinces} placeholder="Custom placeholder" />
);
export const Disabled: Story = () => (
    <Select label="Select an option" options={provinces} disabled />
);
export const Invalid: Story = () => (
    <Select label="Select an option" options={provinces} valid={false} />
);
export const Required: Story = () => (
    <form onSubmit={(event) => event.preventDefault()}>
        <Select required label="Select an option" options={provinces} />
        <button type="submit">Submit</button>
    </form>
);
export const Searchable: Story = () => (
    <Select label="Select an option" options={provinces} searchable />
);
export const WithCallback: Story = () => (
    <Select
        label="Select an option"
        options={provinces}
        onChange={(option) => console.info(`Label: ${option.label} | Value: ${option.value}`)}
    />
);
export const WithDefaultValue: Story = () => (
    <Select label="Select an option" options={provinces} defaultValue="qc" />
);
export const WithoutLabel: Story = () => (
    <Select options={provinces} />
);
export const WithSkip: Story = () => (
    <Select label="Select an option" options={provinces} skipOption={skipOption} />
);
export const WithTwoItemsVisible: Story = () => (
    <Select label="Select an option" options={provinces} numberOfItemsVisible={2} />
);

export const WithDisabledOptions: Story = () => {
    const disabledOptions = [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4', disabled: true },
    ];

    return <Select label="Select an option" options={disabledOptions} />;
};
