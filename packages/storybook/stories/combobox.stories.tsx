import { useState } from 'react';
import { Button, Combobox, ComboboxOption } from '@equisoft/design-elements-react';
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
    title: 'Components/Controls/Combobox',
    component: Combobox,
    decorators: [decorateWith(Container)],
};

export const Normal: Story = () => (
    <Combobox
        data-testid="some-data-test-id"
        label="Select an option"
        hint="Hint"
        options={provinces}
        placeholder="Select the best province"
    />
);

export const WithInlineAutocomplete: Story = () => (
    <Combobox
        label="Select an option"
        hint="Hint"
        inlineAutoComplete
        options={provinces}
    />
);

export const AllowCustomValue: Story = () => (
    <Combobox
        allowCustomValue
        label="Select an option"
        hint="Hint"
        options={provinces}
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

export const RequiredWithValidationError: Story = () => {
    const [value, setValue] = useState<string | undefined>(undefined);
    const [valid, setValid] = useState(true);

    return (
        <>
            <Combobox
                label="Select an option"
                options={provinces}
                onChange={(newValue) => { setValid(true); setValue(newValue); }}
                required
                valid={valid}
            />
            <Button buttonType="primary" onClick={() => setValid(!!value)}>Submit</Button>
        </>
    );
};

export const WithCallback: Story = () => {
    const [output, setOutput] = useState('');

    return (
        <>
            <Combobox
                label="Select an option"
                options={provinces}
                onChange={setOutput}
            />

            <div style={{ marginTop: '40px' }}>
                {`Value: ${output}`}
            </div>
        </>
    );
};
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

export const UsingAsyncDataSource: Story = () => {
    const [options, setOptions] = useState<ComboboxOption[]>([]);
    const [isLoading, setIsLoading] = useState(false);

    function handleChange(newValue: string): void {
        if (newValue === '') {
            setOptions([]);
            return;
        }

        setIsLoading(true);

        setTimeout(() => {
            setOptions(provinces.filter(({ value }) => value.toLowerCase().startsWith(newValue.toLowerCase())));
            setIsLoading(false);
        }, 500);
    }

    return <Combobox label="Select an option" isLoading={isLoading} options={options} onChange={handleChange} />;
};
