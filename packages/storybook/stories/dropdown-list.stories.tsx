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

export const Disabled: Story = () => (
    <DropdownList label="Select an option" options={provinces} disabled />
);

export const Invalid: Story = () => (
    <DropdownList label="Select an option" options={provinces} valid={false} />
);

export const Required: Story = () => (
    <DropdownList required label="Select an option" options={provinces} />
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

export const WithControlledValue: Story = () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    function handleChange(option: DropdownListOption): void {
        setValue(option.value);
    }

    return (
        <>
            <DropdownList label="Select an option" options={provinces} onChange={handleChange} value={value} />
            <Button buttonType="primary" onClick={() => setValue('qc')}>Set value to Quebec</Button>
        </>
    );
};

export const WithoutLabel: Story = () => (
    <DropdownList options={provinces} />
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

export const WithDisabledDefaultOption: Story = () => {
    const [value, setValue] = useState<string>('');

    function handleChange(option: DropdownListOption): void {
        setValue(option.value);
    }

    const options = [
        { value: '', label: '', disabled: true },
        { value: 'optionA', label: 'Option A' },
        { value: 'optionB', label: 'Option B' },
        { value: 'optionC', label: 'Option C' },
    ];

    return (
        <>
            <DropdownList label="Select an option" options={options} value={value} onChange={handleChange} />
            <Button buttonType="primary" onClick={() => setValue('')}>Re-select empty option</Button>
        </>
    );
};

export const WithOverflowingText: Story = () => {
    const longLabel = 'This is option 1, with a very long label that should allow some wrapping in the listbox, '
        + 'while showcasing an ellipsis in the textbox when selected (you may have to resize your browser window)';

    const options = [
        { value: 'option1', label: longLabel },
        { value: 'option2', label: 'This is option 2' },
    ];

    return <DropdownList label="Select an option" options={options} defaultValue="option1" />;
};
