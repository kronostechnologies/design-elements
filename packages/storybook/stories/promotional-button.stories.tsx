import { PromotionalButton } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PromotionalButton> = {
    title: 'Components/Promotional Button',
    component: PromotionalButton,
    argTypes: {
        onClick: {
            control: { disable: true },
        },
    },
    args: {
        label: 'Some promo',
        onClick: () => alert('Promotional button clicked!'), // eslint-disable-line no-alert
    },
};

export default meta;

type Story = StoryObj<typeof PromotionalButton>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        loading: true,
        loadingLabel: 'Loading...',
    },
};
