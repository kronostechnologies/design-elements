import React from 'react';

import { Button, MoneyInput } from '@equisoft/design-elements-react';

export default {
    title: 'Money Input',
    component: MoneyInput,
};

export const normal = () => (
    <>
        <MoneyInput label="Entrez un montant"/>
        <MoneyInput label="Chose a number" language="en"/>
    </>
);

export const english = () => (
    <MoneyInput label="Chose a number" language="en"/>
);
export const noLabel = () => (
    <MoneyInput/>
);
export const disabled = () => (
    <MoneyInput disabled label="Entrez un montant"/>
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
