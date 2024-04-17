import { MoneyInput } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Money Input',
    component: MoneyInput,
};

export const FrenchLocale: Story = () => (
    <MoneyInput data-testid='some-data-testid' hint="Hint" label="Entrez un montant" />
);

export const EnglishLocale: Story = () => (
    <MoneyInput label="Choose a number" locale="en-CA" />
);

export const OnChangeCallback: Story = () => (
    <MoneyInput
        label="Entrez un montant"
        onChange={(value, formattedValue) => {
            console.info('value:', value);
            console.info('formattedValue: ', formattedValue);
        }}
    />
);
OnChangeCallback.parameters = rawCodeParameters;
