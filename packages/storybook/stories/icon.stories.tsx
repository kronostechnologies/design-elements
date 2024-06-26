import { Icon } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Foundations/Icons/Icon',
    component: Icon,
    tags: ['autodocs'],
};

export const BasicIcon: Story = () => (
    <Icon name="alertTriangle" />
);

export const WithColor: Story = () => (
    <Icon name="alertTriangle" color="orange" />
);

export const WithSize: Story = () => (
    <Icon name="alertTriangle" size="78" />
);
