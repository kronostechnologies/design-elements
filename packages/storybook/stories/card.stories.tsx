import { Card } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Structure/Card',
    component: Card,
};

export const Normal: Story = () => (
    <Card>Hello, World!</Card>
);
