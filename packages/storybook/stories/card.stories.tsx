import { Card } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof Card> = {
    title: 'Components/Card',
    component: Card,
};

export default meta;

type Story = StoryObj<typeof Card>;

export const NonClickable: Story = {
    render: (args) => (
        <Card {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            Hello, world!
        </Card>
    ),
};
