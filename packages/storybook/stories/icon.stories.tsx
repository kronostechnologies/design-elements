import { Icon } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Icons/Icon',
    component: Icon,
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
