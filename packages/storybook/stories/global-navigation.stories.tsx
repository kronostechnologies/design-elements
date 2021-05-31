import { GlobalNavigation, GlobalNavigationItem } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { RouterDecorator } from './utils/router-decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';
import { ButtonProps } from '../../react/dist/components/buttons/icon-button';

export default {
    title: 'Structure/Global Navigation',
    component: GlobalNavigation,
    decorators: [RouterDecorator],
};

const items: GlobalNavigationItem[] = [
    {
        iconName: 'home',
        name: 'home',
        href: '/test1',
    },
    {
        iconName: 'edit',
        name: 'edit',
        href: '/test2',
    },
    {
        iconName: 'mapPin',
        name: 'map',
        href: '/test3',
    },
    {
        iconName: 'mail',
        name: 'mail',
        href: '/test4',
    },
    {
        iconName: 'phone',
        name: 'phone',
        href: '/test5',
    },
];

const footerItems: GlobalNavigationItem[] = [
    {
        iconName: 'info',
        name: 'info',
        href: '/test6',
    },
    {
        iconName: 'helpCircle',
        name: 'help',
        href: '/test7',
    },
];

const coreActionButton: ButtonProps = {
    buttonType: 'primary',
    iconName: 'plusSign',
    label: 'add',
    onClick: () => console.info('The button has been clicked!'),
};

export const Normal: Story = () => (
    <div style={{ height: '600px' }}>
        <GlobalNavigation
            coreActionButton={coreActionButton}
            mainItems={items}
            footerItems={footerItems}
        />
    </div>
);

export const WithMoreIcon: Story = () => (
    <div style={{ height: '350px' }}>
        <GlobalNavigation
            mainItems={items}
            footerItems={footerItems}
        />
    </div>
);

export const WithMoreIconInShadowDom: Story = () => (
    <div style={{ height: '350px' }}>
        <GlobalNavigation
            mainItems={items}
            footerItems={footerItems}
        />
    </div>
);
WithMoreIconInShadowDom.decorators = [ShadowDomDecorator];
