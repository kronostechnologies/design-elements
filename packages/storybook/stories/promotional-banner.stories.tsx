import { Logo, PromotionalBanner } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';

const meta: Meta<typeof PromotionalBanner> = {
    title: 'Components/Promotional Banner',
    component: PromotionalBanner,
};

export default meta;

type Story = StoryObj<typeof PromotionalBanner>;

export const Default: Story = {
    args: {
        link: {
            label: 'Some promo',
            // eslint-disable-next-line no-alert
            onClick: () => alert('Promotional banner clicked!'),
        },
        onDismiss: () => console.info('onDismiss'),
    },
    render: (args) => (
        <PromotionalBanner {...args /* eslint-disable-line react/jsx-props-no-spreading */}>
            <Logo name="lifeguide" />
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor.
        </PromotionalBanner>
    ),
};
