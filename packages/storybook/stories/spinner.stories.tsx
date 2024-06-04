import { Spinner } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Spinner',
    component: Spinner,
    tags: ['autodocs'],
};

export const Enso: Story = () => (
    <Spinner />
);
