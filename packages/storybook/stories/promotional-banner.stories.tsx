import { PromotionalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PromotionalBanner> = {
    title: 'Components/Promotional Banner',
    component: PromotionalBanner,
    argTypes: {
        onDismiss: {
            control: { disable: true },
        },
    },
    args: {
        logo: 'lifeguide',
        button: {
            label: 'Some promo',
            onClick: () => alert('Promotional button clicked!'), // eslint-disable-line no-alert
        },
        onDismiss: () => console.info('onDismiss'), // eslint-disable-line no-console
    },
    render: (args) => (
        <PromotionalBanner {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </PromotionalBanner>
    ),
};

export default meta;

type Story = StoryObj<typeof PromotionalBanner>;

export const Default: Story = {};

export const Loading: Story = {
    args: {
        button: {
            label: 'Some promo',
            loading: true,
            loadingLabel: 'Loading...',
        },
    },
};

export const WithoutDismiss: Story = {
    args: {
        onDismiss: undefined,
    },
};
