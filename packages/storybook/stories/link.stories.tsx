import { Link } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { Link as RouteLink } from 'react-router-dom';
import { RouterDecorator } from './utils/router-decorator';
import { rawCodeParameters } from './utils/parameters';

const LinkMeta: Meta<typeof Link> = {
    title: 'Components/Link',
    component: Link,
    decorators: [RouterDecorator],
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

export const Default: Story = {};

export const External: Story = {
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

export const WithIcon: Story = {
    args: {
        icon: { name: 'mail' },
        children: 'Link with icon',
    },
};

export const OnlyIcon: Story = {
    args: {
        icon: { name: 'mail', label: 'Link icon only' },
    },
    render: (args) => (
        <Link
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        />
    ),
};

export const Disabled: Story = {
    args: {
        children: 'Disabled Link',
        disabled: true,
    },
};

export const ButtonLink: Story = {
    ...External,
    args: {
        external: true,
        children: 'Button Link',
        button: {
            buttonType: 'secondary',
        },
    },
};

export const WithCallback: Story = {
    args: {
        onClick: () => console.info('Link clicked'),
        onBlur: () => console.info('Link blurred'),
        onFocus: () => console.info('Link focused'),
    },
};
WithCallback.parameters = rawCodeParameters;

export const WithRouteLink: Story = {
    args: {
        children: 'Router Link',
        href: '/storybook',
        routerLink: RouteLink,
    },
};
