import { AddButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { InvertedBackground } from './utils/inverted-background';

export default {
    title: 'Controls/Add Button',
    component: AddButton,
};

export const AddButtons: Story = () => (
    <>
        <AddButton label="Primary" buttonType="primary" />
        <AddButton label="Secondary" buttonType="secondary" />
        <AddButton label="Tertiary" buttonType="tertiary" />
        <AddButton label="Destructive" buttonType="destructive" />
    </>
);

export const Inverted: Story = () => (
    <InvertedBackground>
        <AddButton label="Destructive" buttonType="destructive" inverted />
    </InvertedBackground>
);

export const Disabled: Story = () => (
    <>
        <AddButton label="Primary" buttonType="primary" disabled />
        <AddButton label="Secondary" buttonType="secondary" disabled />
        <AddButton label="Tertiary" buttonType="tertiary" disabled />
        <AddButton label="Destructive" buttonType="destructive" disabled />
    </>
);

export const EventCallback: Story = () => (
    <AddButton
        label="See Console For Callback"
        buttonType="primary"
        onClick={() => console.info('The button has been clicked!')}
    />
);
