import { Spinner } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Progress Indicator',
    component: Spinner,
};

export const Default: Story = () => (
    <Spinner />
);
