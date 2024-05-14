import { DropdownList, DropdownListOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

const Container = styled.div`
    height: 260px;
`;

const longLabel = 'This is option 1, with a very long label that should allow some wrapping in the listbox, '
    + 'while showcasing an ellipsis in the textbox when selected (you may have to resize your browser window)'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.'
    + 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.';

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
    { value: 'long', label: longLabel },
];

const DropdownListMeta: Meta<typeof DropdownList> = {
    title: 'Components/Dropdown List',
    component: DropdownList,
    decorators: [decorateWith(Container)],
    args: {
        label: 'Select an option',
        hint: 'Hint',
        tooltip: { label: 'This is a tooltip.' },
    },
    argTypes: {
        options: {
            control: { type: null },
        },
        onChange: {
            control: { type: null },
        },
        tooltip: {
            control: { type: null },
        },
    },
    render: (args) => (
        <DropdownList
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            data-testid="some-data-test-id"
            options={provinces}
        />
    ),
};

export default DropdownListMeta;
type Story = StoryObj<typeof DropdownList>;

export const Default: Story = {
    ...DropdownListMeta,
};

export const MultiSelect: Story = {
    ...DropdownListMeta,
    args: {
        label: 'Select multiple options',
        multiselect: true,
    },
};

export const WithCallback: Story = {
    ...DropdownListMeta,
    args: {
        label: 'Select an option',
        onChange: (option: DropdownListOption) => console.info(`Label: ${option.label} | Value: ${option.value}`),
    },
};
WithCallback.parameters = rawCodeParameters;
