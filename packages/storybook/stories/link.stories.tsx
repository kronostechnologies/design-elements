import { RouteLink } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { NavLink } from 'react-router-dom';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Components/Link',
    component: RouteLink,
    decorators: [RouterDecorator],
};

export const Default: Story = () => (
        <RouteLink routerLink={NavLink} href="/story1" label="Route Link" />
);
