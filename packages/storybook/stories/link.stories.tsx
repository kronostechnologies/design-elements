import React, { ReactElement } from 'react';

import { Link } from '@equisoft/design-elements-react';
import { BrowserRouter as Router, Link as RouterLink, NavLink } from 'react-router-dom';

export default {
    title: 'Link',
    component: Link,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

export const normal = () => (
    <>
        <Link routerLink={NavLink} href="/story1" label="NavLink"/><br/>
        <Link routerLink={RouterLink} href="/story2" label="Link"/>
    </>
);

export const withNavlink = () => (
    <Link routerLink={NavLink} href="/story" label="NavLink"/>
);
export const withLink = () => (
    <Link routerLink={RouterLink} href="/story" label="Link"/>
);

export const withIcon = () => (
    <Link routerLink={NavLink} href="/story" label="Navigation Link" iconName="mail"/>
);
export const onlyIcon = () => (
    <Link routerLink={NavLink} href="/story" iconName="mail"/>
);
export const disabled = () => (
    <>
        <Link routerLink={NavLink} href="/story" label="Navigation Link" iconName="mail" disabled/><br/>
        <Link routerLink={NavLink} href="/story" label="Navigation Link" disabled/><br/>
    </>
);
