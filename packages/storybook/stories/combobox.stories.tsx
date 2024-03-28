import { useState } from 'react';
import { Button, Combobox } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const Container = styled.div`
    height: 240px;
`;

const provinces = [
    { value: 'Alberta' },
    { value: 'British Columbia' },
    { value: 'Manitoba', disabled: true },
    { value: 'New Brunswick' },
    { value: 'Newfoundland and Labrador' },
    { value: 'Northwest Territories' },
    { value: 'Nova Scotia' },
    { value: 'Nunavut' },
    { value: 'Ontario', disabled: true },
    { value: 'Prince Edward Island' },
    { value: 'Quebec' },
    { value: 'Saskatchewan' },
    { value: 'Yukon' },
];

export default {
    title: 'Components/Combobox',
    component: Combobox,
    decorators: [decorateWith(Container)],
};

export const Normal: Story = () => (
    <Combobox
        data-testid="some-data-test-id"
        label="Select an option"
        hint="Hint"
        options={provinces}
    />
);

export const ListAutocomplete: Story = () => (
    <Combobox
        label="Select an option"
        hint="Hint"
        options={provinces}
        autoComplete="list"
    />
);

export const InlineAutocomplete: Story = () => (
    <Combobox
        label="Select an option"
        hint="Hint"
        options={provinces}
        autoComplete="inline"
    />
);

export const BothAutocompletes: Story = () => (
    <Combobox
        label="Select an option"
        hint="Hint"
        options={provinces}
        autoComplete="both"
    />
);

export const WithTooltip: Story = () => (
    <Combobox
        label="Select an option"
        tooltip={{ label: 'Tooltip text content' }}
        hint="Hint"
        options={provinces}
    />
);

export const InsideShadowDom: Story = () => (
    <Combobox label="Select an option" hint="Hint" options={provinces} />
);
InsideShadowDom.decorators = [ShadowDomDecorator];

export const Disabled: Story = () => (
    <Combobox label="Select an option" options={provinces} disabled />
);

export const Invalid: Story = () => (
    <Combobox label="Select an option" options={provinces} valid={false} />
);

export const Required: Story = () => (
    <Combobox required label="Select an option" options={provinces} />
);

export const WithCallback: Story = () => (
    <Combobox
        label="Select an option"
        options={provinces}
        onChange={(newValue) => console.info(`Value: ${newValue}`)}
    />
);
WithCallback.parameters = rawCodeParameters;

export const WithDefaultValue: Story = () => (
    <Combobox label="Select an option" options={provinces} defaultValue="Quebec" />
);

export const WithControlledValue: Story = () => {
    const [value, setValue] = useState<string | undefined>(undefined);

    function handleChange(newValue: string): void {
        setValue(newValue);
    }

    return (
        <>
            <Combobox
                label="Select an option"
                options={provinces}
                onChange={handleChange}
                value={value}
                autoComplete="both"
            />
            <Button buttonType="primary" onClick={() => setValue('Quebec')}>Set value to Quebec</Button>
        </>
    );
};

export const WithDisabledOptions: Story = () => {
    const disabledOptions = [
        { value: 'option1', label: 'Option 1', disabled: true },
        { value: 'option2', label: 'Option 2' },
        { value: 'option3', label: 'Option 3' },
        { value: 'option4', label: 'Option 4', disabled: true },
    ];

    return <Combobox label="Select an option" options={disabledOptions} />;
};
