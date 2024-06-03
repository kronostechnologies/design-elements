import { useState } from 'react';
import { Combobox, ComboboxOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
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

const comboboxMeta: Meta<typeof Combobox> = {
    title: 'Components/Combobox',
    component: Combobox,
    decorators: [decorateWith(Container)],
    args: {
        label: 'Select an option',
        hint: 'Hint',
        options: provinces,
    },
};

export default comboboxMeta;
type Story = StoryObj<typeof Combobox>;

export const Default: Story = {
    ...comboboxMeta,
    args: {
        placeholder: 'Select the best province',
    },
};

export const CustomValue: Story = {
    ...comboboxMeta,
    args: {
        allowCustomValue: true,
    },
};

export const WithCallback: Story = {
    ...comboboxMeta,
    args: {
        onChange: (value: string) => console.log(value), /* eslint-disable-line no-console */
    },
    parameters: rawCodeParameters,
};

export const UsingAsyncDataSource: Story = {
    ...comboboxMeta,
    render: (args) => {
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

        return (
            <Combobox
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                isLoading={isLoading}
                options={options}
                onChange={handleChange}
            />
        );
    },
};
