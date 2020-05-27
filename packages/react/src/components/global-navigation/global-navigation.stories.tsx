import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { GlobalNavigation, GlobalNavigationItem } from './global-navigation';

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
