import { Breadcrumb, BreadcrumbElement } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { RouterDecorator } from '../utils/router-decorator';

const routeMap = (length: number): BreadcrumbElement[] => {
    const routes = [];
    for (let i = 1; i <= length; i++) {
        routes.push({
            value: `route-${i}`,
            label: `Breadcrumb ${i}`,
            href: `test-${i}`,
        });
    }
    return routes;
};

export default {
    title: 'Navigation/Breadcrumb',
    component: Breadcrumb,
    decorators: [RouterDecorator],
};

export const Default: Story = () => (
    <Breadcrumb history={routeMap(5)} />
);

export const Root: Story = () => (
    <Breadcrumb history={routeMap(1)} />
);

export const NoDropdown: Story = () => (
    <Breadcrumb history={routeMap(2)} />
);
