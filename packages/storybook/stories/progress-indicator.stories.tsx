import { Spinner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const progressIndicatorMeta: Meta<typeof Spinner> = {
    title: 'Components/Progress Indicator',
    component: Spinner,
};

export default progressIndicatorMeta;

type Story = StoryObj<typeof Spinner>;

export const Default: Story = {};
