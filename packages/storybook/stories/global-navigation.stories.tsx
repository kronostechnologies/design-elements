import { GlobalNavigation, GlobalNavigationItem } from '@equisoft/design-elements-react';
import { IconButtonProps } from '@equisoft/design-elements-react/dist/components/buttons/icon-button';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';
import { RouterDecorator } from './utils/router-decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

export default {
    title: 'Components/Deprecated/Global Navigation (deprecated)',
    component: GlobalNavigation,
    decorators: [RouterDecorator],
    tags: ['autodocs'],
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

const coreActionButton: IconButtonProps = {
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

export const WithCallbacks: Story = () => {
    const callbackItems: GlobalNavigationItem[] = [
        {
            iconName: 'home',
            name: 'home',
            href: '/test1',
            onClick: () => console.info('clicked'),
        },
        {
            iconName: 'edit',
            name: 'edit',
            href: '/test2',
            onClick: () => console.info('clicked'),
        },
    ];

    const callbackFooterItems: GlobalNavigationItem[] = [
        {
            iconName: 'info',
            name: 'info',
            href: '/test3',
            onClick: () => console.info('clicked'),
        },
    ];
    return (
        <div style={{ height: '300px' }}>
            <GlobalNavigation
                mainItems={callbackItems}
                footerItems={callbackFooterItems}
            />
        </div>
    );
};
WithCallbacks.parameters = rawCodeParameters;
