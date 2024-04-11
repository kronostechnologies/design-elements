import { Button } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Button',
    component: Button,
};

export const Primary: Story = () => (
    <>
        <Button label="Primary" buttonType="primary" />
    </>
);
export const Secondary: Story = () => (
    <>
        <Button label="Secondary" buttonType="secondary" />
     </>
);
export const Tertiary: Story = () => (
     <>
        <Button label="Tertiary" buttonType="tertiary" />
     </>
);
export const DestructivePrimary: Story = () => (
    <>
        <Button label="Destructive Primary " buttonType="destructive" />
    </>
);
export const DestructiveSecondary: Story = () => (
     <>
        <Button label="Destructive Secondary " buttonType="destructive-secondary" />
    </>
);
export const DestructiveTertiary: Story = () => (
    <>
        <Button label="Destructive Tertiary " buttonType="destructive-tertiary" />
    </>
);
