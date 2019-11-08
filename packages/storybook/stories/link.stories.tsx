import React from 'react';

import { Link } from '@equisoft/design-elements-react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default {
    title: 'Link',
    component: Link,
};

export const all = () => (
    <Router>
        <Link routerLink={NavLink} href="/story1" label="Navigation Link" iconName="mail"/><br/>
        <Link routerLink={NavLink} href="/story2" label="Navigation Link"/><br/>
    </Router>
);

export const disabled = () => (
    <Router>
        <Link routerLink={NavLink} href="/story" label="Navigation Link" iconName="mail" disabled/><br/>
        <Link routerLink={NavLink} href="/story" label="Navigation Link" disabled/><br/>
    </Router>
);
export const withIcon = () => (
    <Router>
        <Link routerLink={NavLink} href="/story" label="Navigation Link" iconName="mail"/>
    </Router>
);
export const onlyIcon = () => (
    <Router>
        <Link routerLink={NavLink} href="/story" iconName="mail"/>
    </Router>
);
