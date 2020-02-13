import React, { ReactElement } from 'react';

import { RouteLink } from '@equisoft/design-elements-react';
import { BrowserRouter as Router, Link, NavLink } from 'react-router-dom';

export default {
    title: 'Route Link',
    component: RouteLink,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

export const normal = () => (
    <>
        <RouteLink routerLink={NavLink} href="/story1" label="Route Link"/><br/>
        <RouteLink routerLink={Link} href="/story2" label="Route Link"/>
    </>
);

export const withNavlink = () => (
    <RouteLink routerLink={NavLink} href="/story" label="NavLink"/>
);
export const withLink = () => (
    <RouteLink routerLink={Link} href="/story" label="Link"/>
);

export const withIcon = () => (
    <RouteLink routerLink={NavLink} href="/story" label="Route Link" iconName="mail"/>
);
export const onlyIcon = () => (
    <RouteLink routerLink={NavLink} href="/story" iconName="mail"/>
);
export const disabled = () => (
    <>
        <RouteLink routerLink={NavLink} href="/story" label="Route Link" iconName="mail" disabled/><br/>
        <RouteLink routerLink={NavLink} href="/story" label="Route Link" disabled/><br/>
    </>
);
