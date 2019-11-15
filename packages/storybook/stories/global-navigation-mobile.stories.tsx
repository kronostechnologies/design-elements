import React, { ReactElement } from 'react';

import { ExternalLink, GlobalNavigationMobile, RouteLink } from '@equisoft/design-elements-react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import { forceReRender } from '@storybook/react';

export default {
    title: 'Global Navigation Mobile',
    component: GlobalNavigationMobile,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

let MainMenuOpen = false;
let SideMenuOpen = false;

const HandleMainMenuClick = () => {
    MainMenuOpen = !MainMenuOpen;
    forceReRender();
};

const HandleSideMenuClick = () => {
    SideMenuOpen = !SideMenuOpen;
    forceReRender();
};

export const globalNavigationMobile = () => (
    <>
        <GlobalNavigationMobile open={MainMenuOpen}>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Profile" href="/test" iconName="mail"/></li>
                <li><ExternalLink label="Log out" href="/test2"/></li>
            </ul>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Section 1" href="/section1" iconName="home"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 2" href="/section2" iconName="mail"/></li>
                <li><RouteLink routerLink={NavLink} label="Section 3" href="/section3" iconName="mapPin"/></li>
            </ul>
            <ul>
                <li><RouteLink routerLink={NavLink} label="Settings" href="/settings"/></li>
                <li><RouteLink routerLink={NavLink} label="Contact us" href="/contact" iconName="info"/></li>
                <li>
                    <RouteLink
                        routerLink={NavLink}
                        label="Legal mentions"
                        href="/legal-mentions"
                        iconName="helpCircle"
                    />
                </li>
            </ul>
            <GlobalNavigationMobile open={SideMenuOpen}>
                <ul>
                    <li><RouteLink routerLink={NavLink} label="Settings" href="/settings"/></li>
                    <li><RouteLink routerLink={NavLink} label="Contact us" href="/contact" iconName="info"/></li>
                </ul>
                <button onClick={HandleSideMenuClick}>Close current menu</button>
            </GlobalNavigationMobile>
            <button onClick={HandleMainMenuClick}>Close current menu</button><br/>
            <button onClick={HandleSideMenuClick}>Toggle menu</button>
        </GlobalNavigationMobile>
        <button onClick={HandleMainMenuClick}>Toggle menu</button>
    </>
);
