import { useState } from 'react';
import { Combobox, ComboboxOption } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

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

export const Default: Story = () => (
    <Combobox
        data-testid="some-data-test-id"
        label="Select an option"
        hint="Hint"
        options={provinces}
        placeholder="Select the best province"
    />
);

export const CustomValue: Story = () => (
    <Combobox
        allowCustomValue
        label="Select an option"
        hint="Hint"
        options={provinces}
    />
);

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
