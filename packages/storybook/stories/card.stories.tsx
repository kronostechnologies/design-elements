import { Card } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import * as React from 'react';

export default {
    title: 'Card',
    component: Card,
};

export const Normal: Story = () => (
    <Card>Hello, World!</Card>
);
