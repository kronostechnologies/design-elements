import { GlobalNavigation, GlobalNavigationItem } from '@equisoft/design-elements-react';
import React, { ReactElement } from 'react';
import { BrowserRouter as Router, NavLink } from 'react-router-dom';

export default {
    title: 'Global Navigation',
    component: GlobalNavigation,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

const items: GlobalNavigationItem[] = [
    {
        iconName: 'home',
        name: 'story 1',
        href: '/story1',
    },
    {
        iconName: 'edit',
        name: 'story 2',
        href: '/story2',
    },
    {
        iconName: 'mapPin',
        name: 'story 3',
        href: '/story3',
    },
    {
        iconName: 'mail',
        name: 'story 4',
        href: '/story4',
    },
    {
        iconName: 'phone',
        name: 'story 5',
        href: '/story5',
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
                    name: 'story 6',
                    href: '/story6',
                },
                {
                    iconName: 'helpCircle',
                    name: 'story 7',
                    href: '/story7',
                },
            ]}
        />
    </div>
);

export const withMoreIcon = () => (
    <div style={{ height: '350px' }}>
        <GlobalNavigation
            mainItems={items}
            routerLink={NavLink}
            footerItems={[
                {
                    iconName: 'info',
                    name: 'story 8',
                    href: '/story8',
                },
                {
                    iconName: 'helpCircle',
                    name: 'story 9',
                    href: '/story9',
                },
            ]}
        />
    </div>
);
