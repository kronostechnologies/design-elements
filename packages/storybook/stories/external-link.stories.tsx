import { ExternalLink } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

const ExternalLinkMeta: Meta<typeof ExternalLink> = {
    title: 'Deprecated/External Link (deprecated)',
    component: ExternalLink,
    args: {
        label: 'External Link',
    },
    argTypes: {
        onClick: {
            control: { disable: true },
        },
    },
    render: (args) => (
        <ExternalLink
            href="/story1"
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        />
    ),
    tags: ['autodocs'],
};

export default ExternalLinkMeta;
type Story = StoryObj<typeof ExternalLink>;

export const Default: Story = {
    ...ExternalLinkMeta,
};

export const WithIcon: Story = {
    ...ExternalLinkMeta,
    args: {
        iconName: 'mail',
    },
};

export const OnlyIcon: Story = {
    ...ExternalLinkMeta,
    args: {
        label: undefined,
    },
};

export const Disabled: Story = {
    ...ExternalLinkMeta,
    args: {
        disabled: true,
    },
};

export const WithCallback: Story = {
    ...ExternalLinkMeta,
    args: {
        onClick: () => console.info('Link clicked'),
    },
};
WithCallback.parameters = rawCodeParameters;
