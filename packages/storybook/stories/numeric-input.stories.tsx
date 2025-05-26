import { NumericInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { LanguageSwitchDecorator } from './utils/decorator';
import { rawCodeParameters } from './utils/parameters';

const NumericInputMeta: Meta<typeof NumericInput> = {
    title: 'Components/Numeric Input',
    component: NumericInput,
    args: {
        label: 'Number',
        defaultValue: '50',
        adornment: '%',
    },
    argTypes: {
        adornment: {
            control: { disable: true },
        },
        onChange: {
            control: { disable: true },
        },
        onBlur: {
            control: { disable: true },
        },
        onFocus: {
            control: { disable: true },
        },
    },

    render: (args) => (
        <NumericInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        />
    ),
};

export default NumericInputMeta;
type Story = StoryObj<typeof NumericInput>;

export const Default: Story = {};

export const ControlledValue: Story = {
    decorators: [LanguageSwitchDecorator],
    render: () => {
        const [inputValue, setInputValue] = useState('50');
        return (
            <NumericInput
                label="Label"
                min={0}
                max={100}
                onChange={(_event, { value, valueAsNumber }) => {
                    setInputValue(value);
                    console.info(`NumericInput onChange value: ${value}`);
                    console.info(`NumericInput onChange valueAsNumber: ${valueAsNumber}`);
                }}
                onBlur={(_event, { value, valueAsNumber }) => {
                    console.info(`NumericInput onBlur value: ${value}`);
                    console.info(`NumericInput onBlur valueAsNumber: ${valueAsNumber}`);
                }}
                value={inputValue}
            />
        );
    },
};
ControlledValue.parameters = rawCodeParameters;

export const WithToggletip: Story = {
    args: {
        toggletip: {
            label: 'Toggletip label',
            children: 'Toggletip content',
        },
    },
};
