import { Breadcrumb, BreadcrumbElement } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { RouterDecorator } from './utils/router-decorator';

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
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    decorators: [RouterDecorator],
};

export const Default: Story = () => (
    <Breadcrumb history={routeMap(15)} />
);

export const ThreeElements: Story = () => (
    <Breadcrumb history={routeMap(3)} />
);

export const Root: Story = () => (
    <Breadcrumb history={routeMap(1)} />
);

export const NoDropdown: Story = () => (
    <Breadcrumb history={routeMap(2)} />
);
