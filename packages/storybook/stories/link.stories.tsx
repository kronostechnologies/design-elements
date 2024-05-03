import { RouteLink } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { NavLink } from 'react-router-dom';
import { RouterDecorator } from './utils/router-decorator';

const RouteLinkMeta: Meta<typeof RouteLink> = {
    title: 'Components/Links/Route Link',
    component: RouteLink,
    render: (args) => (
        <RouteLink
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            routerLink={NavLink}
            href="/story1"
            label="Route Link"
        />
    ),
};

export default RouteLinkMeta;
type Story = StoryObj<typeof RouteLink>;

export const Default: Story = {
    ...RouteLinkMeta,
};
Default.decorators = [RouterDecorator];
