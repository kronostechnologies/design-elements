import { AddButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Buttons/Add',
    component: AddButton,
};

export const AddButtons: Story = () => (
    <>
        <AddButton
            label="Primary"
            buttonType="primary"
            disabled={false}
        />
        <AddButton
            label="Secondary"
            buttonType="secondary"
            disabled={false}
        />
        <AddButton
            label="Tertiary"
            buttonType="tertiary"
            disabled={false}
        />
    </>
);
export const Disabled: Story = () => (
    <>
        <AddButton
            label="Primary"
            buttonType="primary"
            disabled
        />
        <AddButton
            label="Secondary"
            buttonType="secondary"
            disabled
        />
        <AddButton
            label="Tertiary"
            buttonType="tertiary"
            disabled
        />
    </>
);
export const EventCallback: Story = () => (
    <AddButton
        label="See Console For Callback"
        buttonType="primary"
        onClick={() => console.info('The button has been clicked!')}
        disabled={false}
    />
);
