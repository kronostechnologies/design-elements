import React from 'react';

import { GlobalNavigation } from '@equisoft/design-elements-react';

export default {
    title: 'GlobalNavigation',
    component: GlobalNavigation,
};

export const globalNavigation = () => (
    <GlobalNavigation
        items={[
            {
                icon: 'home',
                title: 'home',
                onClick: () => console.log('home icon clicked'),
            },
            {
                icon: 'open',
                title: 'portfolio',
                onClick: () => console.log('open icon clicked'),
            },
        ]}
        footerNavPopoverContent={<div>legal mentions</div>}
        onInfoIconClick={() => console.log('click')}
    />
);

export const globalNavigationWithMoreIcon = () => (
    <GlobalNavigation
        maxItemsVisible={2}
        items={[
            {
                icon: 'home',
                title: 'home',
                onClick: () => console.log('home icon clicked'),
            },
            {
                icon: 'open',
                title: 'portfolio',
                onClick: () => console.log('open icon clicked'),
            },
            {
                icon: 'edit',
                title: 'edit',
                onClick: () => console.log('edit icon clicked'),
            },
            {
                icon: 'copy',
                title: 'copy',
                onClick: () => console.log('copy icon clicked'),
            },
        ]}
        footerNavPopoverContent={<div>legal mentions</div>}
        onInfoIconClick={() => console.log('click')}
    />
);
