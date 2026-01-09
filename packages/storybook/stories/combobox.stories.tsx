import { useState } from 'react';
import { Combobox, ComboboxOption } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

const Container = styled.div`
    height: 100px;
`;

const provinces = [
    { value: 'alberta', label: 'Alberta' },
    { value: 'british_columbia', label: 'British Columbia' },
    { value: 'manitoba', label: 'Manitoba', disabled: true },
    { value: 'new_brunswick', label: 'New Brunswick' },
    { value: 'newfoundland_and_labrador', label: 'Newfoundland and Labrador' },
    { value: 'northwest_territories', label: 'Northwest Territories' },
    { value: 'nova_scotia', label: 'Nova Scotia' },
    { value: 'nunavut', label: 'Nunavut' },
    { value: 'ontario', label: 'Ontario', disabled: true },
    { value: 'prince_edward_island', label: 'Prince Edward Island' },
    { value: 'quebec', label: 'Quebec' },
    { value: 'saskatchewan', label: 'Saskatchewan' },
    { value: 'yukon', label: 'Yukon' },
];

const comboboxMeta: Meta<typeof Combobox> = {
    title: 'Components/Combobox',
    component: Combobox,
    decorators: [decorateWith(Container)],
    args: {
        label: 'Select an option',
        hint: 'Hint',
        options: provinces,
        onChange: (value) => console.info('onChange', value),
        onInputChange: (value) => console.info('onInputChange', value),
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

export const WithToggletip: Story = {
    ...comboboxMeta,
    args: {
        toggletip: {
            label: 'Toggletip label',
            children: 'Toggletip content',
        },
    },
};

export const WithMultiselect: Story = {
    ...comboboxMeta,
    args: {
        autoSelectMatchingOption: false,
        defaultValue: ['alberta', 'quebec'],
        label: 'Select options',
        multiselect: true,
        onChange: (options: ComboboxOption[]) => console.log('onChange', options), /* eslint-disable-line no-console */
        onInputChange: (value) => console.info('onInputChange', value), /* eslint-disable-line no-console */
    },
};

export const WithMultiselectCustomValue: Story = {
    ...comboboxMeta,
    args: {
        autoSelectMatchingOption: false,
        defaultValue: ['alberta', 'quebec'],
        label: 'Select options',
        multiselect: true,
        allowCustomValue: true,
        onChange: (options: ComboboxOption[]) => console.log('onChange', options), /* eslint-disable-line no-console */
        onInputChange: (value) => console.info('onInputChange', value), /* eslint-disable-line no-console */
    },
};
