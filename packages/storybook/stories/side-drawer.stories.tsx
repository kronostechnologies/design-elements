import React, { ReactElement } from 'react';

import { Button, ExternalLink, RouteLink, SideDrawer } from '@equisoft/design-elements-react';
import { forceReRender } from '@storybook/react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default {
    title: 'Side Drawer',
    component: SideDrawer,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

type drawerType = 'main' | 'second' | 'nested' | 'left';

const allDrawers = {
    main: false,
    second: false,
    nested: false,
    left: false,
};

const HandleClick = (drawer: drawerType) => {
    allDrawers[drawer] = !allDrawers[drawer];
    forceReRender();
};

export const normal = () => (
    <>
        <SideDrawer open={allDrawers.main}>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Profile" href="/profile" iconName="mail"/></li>
                <li><ExternalLink label="Log out" href="/logout"/></li>
            </ul>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Section 1" href="/section1" iconName="home"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 2" href="/section2" iconName="mail"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 3" href="/section3" iconName="mapPin"/></li>
            </ul>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Settings" href="/settings"/></li>
                <li><RouteLink routerLink={NavLink} label="Contact us" href="/contact" iconName="info"/></li>
                <li><RouteLink routerLink={NavLink} label="Legal mentions" href="/legal" iconName="helpCircle"/></li>
            </ul>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('main')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('main')}/>
    </>
);

export const withNestedDrawer = () => (
    <>
        <SideDrawer open={allDrawers.second}>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Section 1" href="/section1" iconName="home"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 2" href="/section2" iconName="mail"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 3" href="/section3" iconName="mapPin"/></li>
            </ul>
            <SideDrawer open={allDrawers.nested}>
                <p>Nested Drawer</p>
                <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('nested')}/>
            </SideDrawer>
            <Button
                label="Open nested side-drawer"
                buttonType="primary"
                onClick={() => HandleClick('nested')}
            /><br/>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('second')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('second')}/>
    </>
);

export const leftOrigin = () => (
    <>
        <SideDrawer open={allDrawers.left} drawerOrigin="left">
            <ul>
                <li><RouteLink routerLink={NavLink} label="Section 1" href="/section1" iconName="home"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 2" href="/section2" iconName="mail"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 3" href="/section3" iconName="mapPin"/></li>
            </ul>
            <Button label="Close drawer" buttonType="primary" onClick={() => HandleClick('left')}/>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={() => HandleClick('left')}/>
    </>
);
