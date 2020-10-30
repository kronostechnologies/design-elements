import { Button, MoneyInput } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Money Input',
    component: MoneyInput,
};

export const normal = () => (
    <>
        <MoneyInput hint="Hint" label="Entrez un montant"/>
        <MoneyInput hint="Hint" label="Choose a number" locale="en-CA"/>
    </>
);

export const englishLocale = () => (
    <MoneyInput label="Choose a number" locale="en-CA"/>
);
export const noLabel = () => (
    <MoneyInput/>
);
export const disabled = () => (
    <MoneyInput disabled label="Entrez un montant"/>
);
export const withCurrency = () => (
    <MoneyInput label="Entrez un montant" currency="USD"/>
);
export const withPrecision = () => (
    <MoneyInput label="Entrez un montant" precision={0}/>
);
export const withValue = () => (
    <MoneyInput label="Entrez un montant" value={350}/>
);
export const required = () => (
    <form onSubmit={(event) => event.preventDefault()}>
        <MoneyInput required label="Entrez un montant"/>
        <Button buttonType="primary" type="submit">Soumettre</Button>
    </form>
);
export const customErrorMessage = () => (
    <form onSubmit={(event) => event.preventDefault()}>
        <MoneyInput required label="Entrez un montant" validationErrorMessage="Custom error message."/>
    </form>
);
export const onChangeCallback = () => (
    <MoneyInput
        label="Entrez un montant"
        onChange={(value, formattedValue) => {
            console.log('value:', value);
            console.log('formattedValue: ', formattedValue);
        }}
    />
);
