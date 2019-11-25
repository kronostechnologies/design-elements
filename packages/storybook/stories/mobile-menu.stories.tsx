import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import { ExternalLink, MobileMenu, MobileMenuItem, RouteLink, SideDrawer } from '@equisoft/design-elements-react';

export default {
    title: 'Mobile Menu',
    component: MobileMenu,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

export const normal = () => (
    <SideDrawer open>
        <MobileMenu>
            <MobileMenuItem>
                <h2>Mobile Menu</h2>
            </MobileMenuItem>
            <MobileMenuItem>
                <ExternalLink label="External Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story1" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story2" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story3" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story4" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <p>Test paragraph</p>
            </MobileMenuItem>
        </MobileMenu>
        <MobileMenu>
            <MobileMenuItem>
                <ExternalLink label="External Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story1" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story2" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story3" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story4" label="Navigation Link" iconName="mail"/>
            </MobileMenuItem>
        </MobileMenu>
    </SideDrawer>
);
