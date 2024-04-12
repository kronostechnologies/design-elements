import { IconButton } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { InvertedBackground } from './utils/inverted-background';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Icon Button',
    component: IconButton,
};

export const IconButtons: Story = () => (
    <>
        <IconButton label="home" buttonType="primary" iconName="home" />
        <IconButton label="mail" buttonType="secondary" iconName="mail" />
        <IconButton label="map" buttonType="tertiary" iconName="mapPin" />
        <IconButton label="Delete" buttonType="destructive-primary" iconName="x" />
        <IconButton label="Delete" buttonType="destructive-secondary" iconName="x" />
        <IconButton label="Delete" buttonType="destructive-tertiary" iconName="x" />
    </>
);

export const Inverted: Story = () => (
    <InvertedBackground>
        <IconButton label="Delete" buttonType="destructive-primary" iconName="x" inverted />
        <IconButton label="Delete" buttonType="destructive-secondary" iconName="x" inverted />
        <IconButton label="Delete" buttonType="destructive-tertiary" iconName="x" inverted />
    </InvertedBackground>
);

export const Disabled: Story = () => (
    <>
        <IconButton label="home" buttonType="primary" iconName="home" disabled />
        <IconButton label="mail" buttonType="secondary" iconName="mail" disabled />
        <IconButton label="map" buttonType="tertiary" iconName="mapPin" disabled />
        <IconButton label="Delete" buttonType="destructive-primary" iconName="x" disabled />
        <IconButton label="Delete" buttonType="destructive-secondary" iconName="x" disabled />
        <IconButton label="Delete" buttonType="destructive-tertiary" iconName="x" disabled />
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
EventCallback.parameters = rawCodeParameters;

export const Small: Story = () => (
    <>
        <IconButton label="home" buttonType="primary" iconName="home" size="small" />
        <IconButton label="mail" buttonType="secondary" iconName="mail" size="small" />
        <IconButton label="map" buttonType="tertiary" iconName="mapPin" size="small" />
        <IconButton label="Delete" buttonType="destructive-primary" iconName="x" size="small" />
        <IconButton label="Delete" buttonType="destructive-secondary" iconName="x" size="small" />
        <IconButton label="Delete" buttonType="destructive-tertiary" iconName="x" size="small" />
    </>
);
