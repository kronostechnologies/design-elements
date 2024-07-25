import { Link } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { RouterDecorator } from './utils/router-decorator';
import { rawCodeParameters } from './utils/parameters';

const LinkMeta: Meta<typeof Link> = {
    title: 'Components/Link',
    component: Link,
    args: {
        href: '?path=/story/components-link--external',
    },
    render: (args) => (
        <Link
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            Default Link
        </Link>
    ),
};

export default LinkMeta;
type Story = StoryObj<typeof Link>;

export const Default: Story = {
    ...LinkMeta,
};
Default.decorators = [RouterDecorator];

export const External: Story = {
    ...LinkMeta,
    args: {
        href: 'https://www.google.com',
        external: true,
    },
    render: (args) => (
        <Link
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            External Link
        </Link>
    ),
};
External.decorators = [RouterDecorator];

export const WithIcon: Story = {
    ...Default,
    args: {
        iconName: 'mail',
        label: 'Link with icon',
    },
};

export const OnlyIcon: Story = {
    ...Default,
    args: {
        iconOnly: true,
        iconName: 'mail',
        label: 'Link icon only',
    },
    render: (args) => (
        <Link
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        />
    ),
};

export const Disabled: Story = {
    ...Default,
    args: {
        label: 'Disabled Link',
        disabled: true,
    },
};

export const ButtonLink: Story = {
    ...External,
    args: {
        external: true,
        label: 'Button Link',
        buttonProps: {
            buttonType: 'secondary',
        },
    },
};

export const WithCallback: Story = {
    ...Default,
    args: {
        onClick: () => console.info('Link clicked'),
        onBlur: () => console.info('Link blurred'),
        onFocus: () => console.info('Link focused'),
    },
};
WithCallback.parameters = rawCodeParameters;
