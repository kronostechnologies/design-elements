import { GlobalNavigation, GlobalNavigationItem } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { RouterDecorator } from '../utils/router-decorator';
import { ShadowDomDecorator } from '../utils/shadow-dom-decorator';

export default {
    title: 'Navigation/Global Navigation',
    component: GlobalNavigation,
    decorators: [RouterDecorator],
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

export const Normal: Story = () => (
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

export const WithMoreIcon: Story = () => (
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

export const WithMoreIconInShadowDom: Story = () => (
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
WithMoreIconInShadowDom.decorators = [ShadowDomDecorator];
