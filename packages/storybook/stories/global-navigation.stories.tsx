import { GlobalNavigation } from '@equisoft/design-elements-react';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default {
    title: 'Global Navigation',
    component: GlobalNavigation,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

const items = [
    {
        iconName: 'home',
        name: 'test',
        href: '/test1',
    },
    {
        iconName: 'edit',
        name: 'test',
        href: '/test2',
    },
    {
        iconName: 'mapPin',
        name: 'test',
        href: '/test3',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test4',
    },
    {
        iconName: 'phone',
        name: 'test',
        href: '/test5',
    },
];

export const normal = () => (
    <div style={{ height: '600px' }}>
        <GlobalNavigation
            mainItems={items}
            routerLink={NavLink}
            footerItems={[
                {
                    iconName: 'info',
                    name: 'test',
                    href: '/test9',
                },
                {
                    iconName: 'helpCircle',
                    name: 'test',
                    href: '/test10',
                },
            ]}
        />
    </div>
);

export const withMoreIcon = () => (
    <div style={{ height: '300px' }}>
        <GlobalNavigation
            mainItems={items}
            routerLink={NavLink}
            footerItems={[
                {
                    iconName: 'info',
                    name: 'test',
                    href: '/test9',
                },
                {
                    iconName: 'helpCircle',
                    name: 'test',
                    href: '/test10',
                },
            ]}
        />
    </div>
);
