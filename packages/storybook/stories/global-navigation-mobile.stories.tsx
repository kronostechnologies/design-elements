import React, { ReactElement } from 'react';

import { ExternalLink, GlobalNavigationMobile, RouteLink } from '@equisoft/design-elements-react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default {
    title: 'Global Navigation Mobile',
    component: GlobalNavigationMobile,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

export const globalNavigationMobile = () => (
    <GlobalNavigationMobile>
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
                <RouteLink routerLink={NavLink} label="Legal mentions" href="/legal-mentions" iconName="helpCircle"/>
            </li>
        </ul>
    </GlobalNavigationMobile>
);
