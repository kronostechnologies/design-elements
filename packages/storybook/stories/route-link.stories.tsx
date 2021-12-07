import { RouteLink } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { Link, NavLink } from 'react-router-dom';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Navigation/Route Link',
    component: RouteLink,
    decorators: [RouterDecorator],
};

export const Normal: Story = () => (
    <>
        <RouteLink routerLink={NavLink} href="/story1" label="Route Link" />
        <br />
        <RouteLink routerLink={Link} href="/story2" label="Route Link" />
    </>
);

export const WithNavlink: Story = () => (
    <RouteLink routerLink={NavLink} href="/story" label="NavLink" />
);
export const WithLink: Story = () => (
    <RouteLink routerLink={Link} href="/story" label="Link" />
);

export const WithIcon: Story = () => (
    <RouteLink routerLink={NavLink} href="/story" label="Route Link" iconName="mail" />
);
export const OnlyIcon: Story = () => (
    <RouteLink routerLink={NavLink} href="/story" iconName="mail" />
);
export const Disabled: Story = () => (
    <>
        <RouteLink routerLink={NavLink} href="/story" label="Route Link" iconName="mail" disabled />
        <br />
        <RouteLink routerLink={NavLink} href="/story" label="Route Link" disabled />
        <br />
    </>
);
