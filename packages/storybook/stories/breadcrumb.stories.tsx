import { Breadcrumb, BreadcrumbElement } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
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

const BreadcrumbMeta: Meta<typeof Breadcrumb> = {
    title: 'Components/Breadcrumb',
    component: Breadcrumb,
    argTypes: {
        history: {
            control: { type: null },
        },
    },
    render: (args) => (
        <Breadcrumb
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
            history={routeMap(5)}
        />
        ),
};

export default BreadcrumbMeta;
type Story = StoryObj<typeof Breadcrumb>;

export const Default: Story = {
    ...BreadcrumbMeta,
};
Default.decorators = [RouterDecorator];

export const WithMany: Story = {
    ...BreadcrumbMeta,
    render: () => (
        <Breadcrumb history={routeMap(15)} />
    ),
};
WithMany.decorators = [RouterDecorator];
