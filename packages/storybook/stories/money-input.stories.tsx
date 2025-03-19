import { MoneyInput } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

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
OnChangeCallback.parameters = rawCodeParameters;

export const WithToggletip: Story = {
    ...MoneyInputMeta,
    args: {
        toggletip: {
            label: 'Toggletip label',
            children: 'Toggletip content',
        },
    },
};
