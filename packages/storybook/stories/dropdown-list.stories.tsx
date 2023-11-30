import { DropdownList } from '@equisoft/design-elements-react';
import { Option } from '@equisoft/design-elements-react/dist/components/dropdown-list/dropdown-list';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';
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
    title: 'Components/Controls/Dropdown-list',
    component: DropdownList,
    decorators: [decorateWith(Container)],
};

export const Normal: Story = () => (
    <DropdownList
        data-testid="some-data-test-id"
        label="Select an option"
        hint="Hint"
        options={provinces}
    />
);

export const WithTooltip: Story = () => (
    <DropdownList
        label="Select an option"
        tooltip={{ label: 'Tooltip text content' }}
        hint="Hint"
        options={provinces}
    />
);

export const InsideShadowDom: Story = () => (
    <DropdownList label="Select an option" hint="Hint" options={provinces} />
);
InsideShadowDom.decorators = [ShadowDomDecorator];

export const CustomPlaceholder: Story = () => (
    <DropdownList label="Select an option" options={provinces} placeholder="Custom placeholder" />
);

export const Disabled: Story = () => (
    <DropdownList label="Select an option" options={provinces} disabled />
);

export const Invalid: Story = () => (
    <DropdownList label="Select an option" options={provinces} valid={false} />
);

export const Required: Story = () => (
    <form onSubmit={(event) => event.preventDefault()}>
        <DropdownList required label="Select an option" options={provinces} />
        <button type="submit">Submit</button>
    </form>
);

export const Searchable: Story = () => (
    <DropdownList label="Select an option" options={provinces} searchable />
);

export const WithCallback: Story = () => (
    <DropdownList
        label="Select an option"
        options={provinces}
        onChange={(option) => console.info(`Label: ${option.label} | Value: ${option.value}`)}
    />
);
WithCallback.parameters = rawCodeParameters;

export const WithDefaultValue: Story = () => (
    <DropdownList label="Select an option" options={provinces} defaultValue="qc" />
);

export const WithoutLabel: Story = () => (
    <DropdownList options={provinces} />
);

export const WithSkip: Story = () => (
    <DropdownList label="Select an option" options={provinces} skipOption={skipOption} />
);

export const WithDisabledOptions: Story = () => {
    const disabledOptions = [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4', disabled: true },
    ];

    return <DropdownList label="Select an option" options={disabledOptions} />;
};

export const ControlledWithSkipSelected: Story = () => {
    const [value, setValue] = useState(skipOption.value);

    const handleChange: (option: Option) => void = (option) => {
        setValue(option.value);
    };

    return (
        <DropdownList
            label="Select an option"
            options={provinces}
            skipOption={skipOption}
            onChange={handleChange}
            value={value}
        />
    );
};
