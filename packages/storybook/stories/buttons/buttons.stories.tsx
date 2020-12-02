import { Button } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Buttons',
    component: Button,
};

export const Buttons: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled={false} />
        <Button label="Secondary" buttonType="secondary" disabled={false} />
        <Button label="Tertiary" buttonType="tertiary" disabled={false} />
    </>
);
export const Disabled: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled />
        <Button label="Secondary" buttonType="secondary" disabled />
        <Button label="Tertiary" buttonType="tertiary" disabled />
    </>
);
export const EventCallback: Story = () => (
    <Button
        label="See Console For Callback"
        onClick={() => console.info('The button has been clicked!')}
        buttonType="primary"
        disabled={false}
    />
);
