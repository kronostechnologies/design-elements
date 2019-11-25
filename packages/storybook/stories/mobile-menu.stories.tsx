import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

import { Button, ExternalLink, MobileMenu, MobileMenuItem, RouteLink, SideDrawer } from '@equisoft/design-elements-react';
import { forceReRender } from '@storybook/react';

export default {
    title: 'Mobile Menu',
    component: MobileMenu,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

let open = false;

const HandleClick = () => {
    open = !open;
    forceReRender();
};

export const normal = () => (
    <MobileMenu>
        <MobileMenuItem>
            <ExternalLink href="/story1" label="Section 1" iconName="home"/>
        </MobileMenuItem>
        <MobileMenuItem>
            <RouteLink routerLink={NavLink} href="/story2" label="Section 2" iconName="mail"/>
        </MobileMenuItem>
        <MobileMenuItem>
            <RouteLink routerLink={NavLink} href="/story3" label="Section 3" iconName="alertTriangle"/>
        </MobileMenuItem>
        <MobileMenuItem>
            <RouteLink routerLink={NavLink} href="/story4" label="Section 4" iconName="mapPin"/>
        </MobileMenuItem>
    </MobileMenu>
);

export const inSideDrawer = () => (
    <>
        <SideDrawer open={open}>
            <MobileMenu>
                <MobileMenuItem>
                    <RouteLink routerLink={NavLink} href="/story1" label="Section 1" iconName="home"/>
                </MobileMenuItem>
                <MobileMenuItem>
                    <RouteLink routerLink={NavLink} href="/story2" label="Section 2" iconName="mail"/>
                </MobileMenuItem>
                <MobileMenuItem>
                    <RouteLink routerLink={NavLink} href="/story3" label="Section 3" iconName="alertTriangle"/>
                </MobileMenuItem>
                <MobileMenuItem>
                    <RouteLink routerLink={NavLink} href="/story4" label="Section 4" iconName="mapPin"/>
                </MobileMenuItem>
                <MobileMenuItem>
                    <Button label="Close drawer" buttonType="primary" onClick={HandleClick}/>
                </MobileMenuItem>
            </MobileMenu>
        </SideDrawer>
        <Button label="Click to open side-drawer" buttonType="primary" onClick={HandleClick}/>
    </>
);
export const multipleMenus = () => (
    <>
        <MobileMenu>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story1" label="Section 1" iconName="home"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story2" label="Section 2" iconName="mail"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story3" label="Section 3" iconName="alertTriangle"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story4" label="Section 4" iconName="mapPin"/>
            </MobileMenuItem>
        </MobileMenu>
        <MobileMenu>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story5" label="Contact us" iconName="info"/>
            </MobileMenuItem>
            <MobileMenuItem>
                <RouteLink routerLink={NavLink} href="/story6" label="Legal mentions" iconName="helpCircle"/>
            </MobileMenuItem>
        </MobileMenu>
    </>
);
