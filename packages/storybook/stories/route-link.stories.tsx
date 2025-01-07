import { RouteLink } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { NavLink } from 'react-router-dom';
import { RouterDecorator } from './utils/router-decorator';

const RouteLinkMeta: Meta<typeof RouteLink> = {
    title: 'Components/Deprecated/Route Link (deprecated)',
    component: RouteLink,
    args: {
        label: 'Route Link',
        href: '/story1',
    },
    render: (args) => (
        <RouteLink
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            routerLink={NavLink}
        />
    ),
};

export default RouteLinkMeta;
type Story = StoryObj<typeof RouteLink>;

export const Default: Story = {
    ...RouteLinkMeta,
};
Default.decorators = [RouterDecorator];
