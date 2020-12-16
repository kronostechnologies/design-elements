import { Button, MoneyInput } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';

export default {
    title: 'Money Input',
    component: MoneyInput,
};

export const Normal: Story = () => (
    <>
        <MoneyInput hint="Hint" label="Entrez un montant" />
        <MoneyInput hint="Hint" label="Choose a number" locale="en-CA" />
    </>
);

export const EnglishLocale: Story = () => (
    <MoneyInput label="Choose a number" locale="en-CA" />
);
export const NoLabel: Story = () => (
    <MoneyInput />
);
export const Disabled: Story = () => (
    <MoneyInput disabled label="Entrez un montant" />
);
export const WithCurrency: Story = () => (
    <MoneyInput label="Entrez un montant" currency="USD" />
);
export const WithPrecision: Story = () => (
    <MoneyInput label="Entrez un montant" precision={0} />
);
export const ControlledWithValue: Story = () => {
    const [value, setValue] = useState<number | null>(350);

    return (
        <MoneyInput label="Entrez un montant" value={value} onChange={setValue} />
    );
};
export const Required: Story = () => (
    <form onSubmit={(event) => event.preventDefault()}>
        <MoneyInput required label="Entrez un montant" />
        <Button buttonType="primary" type="submit">Soumettre</Button>
    </form>
);
export const CustomErrorMessage: Story = () => (
    <form onSubmit={(event) => event.preventDefault()}>
        <MoneyInput required label="Entrez un montant" validationErrorMessage="Custom error message." />
    </form>
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
