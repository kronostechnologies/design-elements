import { Button } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Buttons',
    component: Button,
};

export const buttons = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled={false} />
        <Button label="Secondary" buttonType="secondary" disabled={false} />
        <Button label="Tertiary" buttonType="tertiary" disabled={false} />
    </>
);
export const disabled = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled={true} />
        <Button label="Secondary" buttonType="secondary" disabled={true} />
        <Button label="Tertiary" buttonType="tertiary" disabled={true} />
    </>
);
export const eventCallback = () => (
    <Button
        label="See Console For Callback"
        onClick={() => { console.log('The button has been clicked!'); }}
        buttonType="primary"
        disabled={false}
    />
);
