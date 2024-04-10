import { Card } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Card',
    component: Card,
};

export const NonClickable: Story = () => (
    <Card>Hello, World!</Card>
);
