import React, { ReactElement } from 'react';

import { Button, ExternalLink, GlobalNavigationMobile, RouteLink } from '@equisoft/design-elements-react';
import { forceReRender } from '@storybook/react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default {
    title: 'Global Navigation Mobile',
    component: GlobalNavigationMobile,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

type menuType = 'main' | 'second' | 'nested';

const allMenus = {
    main: false,
    second: false,
    nested: false,
};

const HandleMenuClick = (menu: menuType) => {
    allMenus[menu] = !allMenus[menu];
    forceReRender();
};

export const normal = () => (
    <>
        <GlobalNavigationMobile open={allMenus.main}>
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
            <Button label="Close menu" buttonType="primary" onClick={() => HandleMenuClick('main')}/>
        </GlobalNavigationMobile>
        <Button label="Click to open menu" buttonType="primary" onClick={() => HandleMenuClick('main')}/>
    </>
);

export const withNestedMenu = () => (
    <>
        <GlobalNavigationMobile open={allMenus.second}>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Section 1" href="/section1" iconName="home"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 2" href="/section2" iconName="mail"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 3" href="/section3" iconName="mapPin"/></li>
            </ul>
            <GlobalNavigationMobile open={allMenus.nested}>
                <p>Nested Menu</p>
                <Button label="Close menu" buttonType="primary" onClick={() => HandleMenuClick('nested')}/>
            </GlobalNavigationMobile>
            <Button label="Open nested menu" buttonType="primary" onClick={() => HandleMenuClick('nested')}/><br/>
            <Button label="Close menu" buttonType="primary" onClick={() => HandleMenuClick('second')}/>
        </GlobalNavigationMobile>
        <Button label="Click to open menu" buttonType="primary" onClick={() => HandleMenuClick('second')}/>
    </>
);
