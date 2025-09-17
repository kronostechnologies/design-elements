import { BentoMenuButton, ExternalItemProps, GlobalHeader, NavItemProps } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import type { ComponentProps } from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

const StyledDiv = styled.div`
    height: 540px;
`;

const adminProducts: NavItemProps[] = [
    {
        value: 'control-panel-legacy',
        href: 'control-panel-legacy',
        label: 'Control Panel [legacy]',
    },
    {
        value: 'control-panel',
        href: 'control-panel',
        label: 'Control Panel',
    },
];

const products: NavItemProps[] = [
    {
        value: 'connect',
        href: 'connect',
        label: 'Equisoft/connect',
    },
    {
        value: 'plan',
        href: 'plan',
        label: 'Equisoft/plan',
        description: 'Way to long app description to bust the max-width limit of the dropdown',
        lozenge: 'Discover',
    },
    {
        value: 'analyze',
        href: 'analyze',
        label: 'Equisoft/analyze [legacy]',
        disabled: true,
    },
    {
        value: 'google',
        href: 'https://google.ca/',
        label: 'Google',
        description: 'Search Engine',
        iconName: 'search',
        isHtmlLink: true,
    },
    {
        value: 'analyze2',
        href: 'analyze2',
        label: 'Equisoft/analyze',
        description: 'Portfolio Optimizer',
    },
    {
        value: 'analyze3',
        href: 'analyze3',
        label: 'Equisoft/centralize',
    },
];

const productGroups: ComponentProps<typeof BentoMenuButton>['productGroups'] = [
    {
        label: 'Administration',
        name: 'administration',
        productLinks: adminProducts,
    },
    {
        label: 'Products',
        name: 'products',
        productLinks: products,
    },
];

const resources: ExternalItemProps[] = [
    {
        href: 'https://calculatrices-financieres.ca/',
        label: 'Calculatrice financière',
    },
    {
        href: 'https://www.moncomparateurfinancier.com/',
        label: 'Mon comparateur financier',
        disabled: true,
    },
    {
        href: 'https://www.google.com/',
        label: 'Way to long app link to bust the max-width limit of the dropdown',
    },
];

const BentoMenuMeta: Meta<typeof BentoMenuButton> = {
    title: 'Components/Bento Menu',
    component: BentoMenuButton,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
    argTypes: {
        inverted: { control: { type: 'boolean' } },
        onMenuVisibilityChanged: { control: { disable: true } },
        externalLinks: { control: { disable: true } },
        productLinks: { control: { disable: true } },
        productGroups: { control: { disable: true } },
    },
    render: (args) => (
        <GlobalHeader>
            <BentoMenuButton
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                productGroups={productGroups}
                data-testid="some-bento-data-testid"
                externalLinks={resources}
            />
        </GlobalHeader>
        ),
};

export default BentoMenuMeta;
type Story = StoryObj<typeof BentoMenuButton>;

export const Desktop: Story = {
    decorators: [DesktopDecorator],
    ...BentoMenuMeta,
};
Desktop.decorators = [DesktopDecorator];

export const Mobile: Story = {
    ...BentoMenuMeta,
};
Mobile.decorators = [MobileDecorator];
