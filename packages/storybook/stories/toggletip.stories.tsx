import { Toggletip } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Components/Toggletip',
    component: Toggletip,
};

export const Default: Story = () => (
    <Toggletip defaultOpen>Toggletip Content</Toggletip>
);
