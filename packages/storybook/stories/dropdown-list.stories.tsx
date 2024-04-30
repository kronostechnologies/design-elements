import { useState } from 'react';
import { Button, DropdownList, DropdownListOption } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const Container = styled.div`
    height: 260px;
`;

const provinces = [
    { value: 'ab', label: 'Alberta' },
    { value: 'bc', label: 'British Columbia' },
    { value: 'mb', label: 'Manitoba', disabled: true },
    { value: 'nb', label: 'New Brunswick' },
    { value: 'nl', label: 'Newfoundland and Labrador' },
    { value: 'nt', label: 'Northwest Territories' },
    { value: 'ns', label: 'Nova Scotia' },
    { value: 'nu', label: 'Nunavut' },
    { value: 'on', label: 'Ontario', disabled: true },
    { value: 'pe', label: 'Prince Edward Island' },
    { value: 'qc', label: 'Quebec' },
    { value: 'sk', label: 'Saskatchewan' },
    { value: 'yt', label: 'Yukon' },
];

export default {
    title: 'Components/Dropdown List',
    component: DropdownList,
    decorators: [decorateWith(Container)],
};

export const Default: Story = () => (
    <DropdownList
        data-testid="some-data-test-id"
        label="Select an option"
        hint="Hint"
        options={provinces}
    />
);

export const MultiSelect: Story = () => (
    <DropdownList
        label="Select one or more options"
        hint="Hint"
        options={provinces}
        multiselect
    />
);

export const WithCallback: Story = () => (
    <DropdownList
        label="Select an option"
        options={provinces}
        onChange={(option: DropdownListOption) => console.info(`Label: ${option.label} | Value: ${option.value}`)}
    />
);
WithCallback.parameters = rawCodeParameters;
