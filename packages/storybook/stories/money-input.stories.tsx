import { Button, MoneyInput, type MoneyInputProps } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { useCallback, useState } from 'react';

const MoneyInputMeta: Meta<typeof MoneyInput> = {
    title: 'Components/Money Input',
    component: MoneyInput,
    args: {
        label: 'Entrez un montant',
        hint: 'Hint',
        locale: 'fr-CA',
    },
    argTypes: {
        onChange: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <MoneyInput
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            data-testid='some-data-testid'
        />
    ),
};

export default MoneyInputMeta;
type Story = StoryObj<typeof MoneyInput>;

export const FrenchLocale: Story = {
    ...MoneyInputMeta,
};

export const EnglishLocale: Story = {
    ...MoneyInputMeta,
    args: {
        label: 'Choose a number',
        locale: 'en-CA',
    },
};

export const OnChangeCallback: Story = {
    ...MoneyInputMeta,
    args: {
        onChange: (value, formattedValue) => {
            console.info('value:', value);
            console.info('formattedValue: ', formattedValue);
        },
    },
};

export const WithControlledValue: Story = {
    ...MoneyInputMeta,
    render: (args) => {
        const [value, setValue] = useState<number | null>(null);
        const handleChange: MoneyInputProps['onChange'] = useCallback((
            newValue: number | null,
            formattedValue: string,
        ): void => {
            setValue(newValue);
            console.info({ value: newValue, formattedValue });
        }, []);

        return (
            <>
                <Button label="0" buttonType="primary" onClick={() => setValue(0)} />
                <Button label="+1" buttonType="primary" onClick={() => setValue((value || 0) + 1)} />
                {/* eslint-disable-next-line react/jsx-props-no-spreading */}
                <MoneyInput {...args} value={value} onChange={handleChange} />
            </>
        );
    },
};

export const WithToggletip: Story = {
    ...MoneyInputMeta,
    args: {
        toggletip: {
            label: 'Toggletip label',
            children: 'Toggletip content',
        },
    },
};
