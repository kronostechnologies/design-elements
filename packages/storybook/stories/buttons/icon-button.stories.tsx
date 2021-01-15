import { IconButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Buttons/Icon',
    component: IconButton,
};

export const IconButtons: Story = () => (
    <>
        <IconButton label="home" buttonType="primary" iconName="home" />
        <IconButton label="mail" buttonType="secondary" iconName="mail" />
        <IconButton label="map" buttonType="tertiary" iconName="mapPin" />
        <IconButton label="Delete" buttonType="destructive" iconName="x" />
    </>
);

export const Inversed: Story = () => (
    <IconButton label="Delete" buttonType="destructive" iconName="x" inversed />
);

export const Disabled: Story = () => (
    <>
        <IconButton label="home" buttonType="primary" iconName="home" disabled />
        <IconButton label="mail" buttonType="secondary" iconName="mail" disabled />
        <IconButton label="map" buttonType="tertiary" iconName="mapPin" disabled />
        <IconButton label="Delete" buttonType="destructive" iconName="x" disabled />
    </>
);

export const EventCallback: Story = () => (
    <IconButton
        label="home"
        iconName="home"
        onClick={() => console.info('The button has been clicked!')}
        buttonType="primary"
    />
);
