import { Button } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { InvertedBackground } from './utils/inverted-background';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Controls/Button',
    component: Button,
};

export const Buttons: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" />
        <Button label="Secondary" buttonType="secondary" />
        <Button label="Tertiary" buttonType="tertiary" />
        <Button label="Destructive" buttonType="destructive" />
    </>
);

export const Disabled: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" disabled />
        <Button label="Secondary" buttonType="secondary" disabled />
        <Button label="Tertiary" buttonType="tertiary" disabled />
        <Button label="Destructive" buttonType="destructive" disabled />
    </>
);

export const Inverted: Story = () => (
    <InvertedBackground>
        <Button label="Primary" buttonType="primary" inverted />
        <Button label="Secondary" buttonType="secondary" inverted />
        <Button label="Tertiary" buttonType="tertiary" inverted />
        <Button label="Destructive" buttonType="destructive" inverted />
    </InvertedBackground>
);
export const InvertedDisabled: Story = () => (
    <InvertedBackground>
        <Button label="Primary" buttonType="primary" inverted disabled />
        <Button label="Secondary" buttonType="secondary" inverted disabled />
        <Button label="Tertiary" buttonType="tertiary" inverted disabled />
        <Button label="Destructive" buttonType="destructive" inverted disabled />
    </InvertedBackground>
);

export const EventCallback: Story = () => (
    <Button
        label="See Console For Callback"
        onClick={() => console.info('The button has been clicked!')}
        buttonType="primary"
    />
);
EventCallback.parameters = rawCodeParameters;
