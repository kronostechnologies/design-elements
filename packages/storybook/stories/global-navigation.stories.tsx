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
        iconName: 'mail',
        name: 'test',
        href: '/test1',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test2',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test3',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test4',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test5',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test6',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test7',
    },
    {
        iconName: 'mail',
        name: 'test',
        href: '/test8',
    },
];

export const normal = () => (
    <div style={{ height: '600px' }}>
        <GlobalNavigation
            mainItems={items}
            routerLink={NavLink}
            footerItems={[
                {
                    iconName: 'home',
                    name: 'test',
                    href: '/test9',
                },
                {
                    iconName: 'home',
                    name: 'test',
                    href: '/test10',
                },
            ]}
        />
    </div>
);
