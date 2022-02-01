import { BentoMenuButton, ExternalItemProps, GlobalHeader, NavItemProps } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

const StyledDiv = styled.div`
    height: 540px;
`;

export default {
    title: 'Navigation/Bento Menu',
    component: BentoMenuButton,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
};

const products: NavItemProps[] = [
    {
        value: 'connect',
        href: 'connect',
        label: 'Equisoft/Connect',
        description: 'Short app description',
    },
    {
        value: 'plan',
        href: 'plan',
        label: 'Equisoft/Plan',
        description: 'Way to long app description to bust the max-width limit of the dropdown',
        lozenge: 'Discover',
    },
    {
        value: 'analyze',
        href: 'analyze',
        label: 'Equisoft/Analyze',
        description: 'Short app description',
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

export const Desktop: Story = () => (
    <GlobalHeader>
        <BentoMenuButton data-testid="some-bento-data-testid" productLinks={products} externalLinks={resources} />
    </GlobalHeader>
);
Desktop.decorators = [DesktopDecorator];

export const Mobile: Story = () => (
    <GlobalHeader>
        <BentoMenuButton productLinks={products} externalLinks={resources} />
    </GlobalHeader>
);
Mobile.decorators = [MobileDecorator];

export const WithNavContainer: Story = () => (
    <GlobalHeader>
        <BentoMenuButton tag="nav" productLinks={products} externalLinks={resources} />
    </GlobalHeader>
);

export const WithCustomProductGroups: Story = () => (
    <GlobalHeader>
        <BentoMenuButton
            tag="nav"
            productGroups={[
                {
                    name: 'groupA',
                    label: 'Label Group A',
                    productLinks: [products[0], products[1]],
                },
                {
                    name: 'groupB',
                    label: 'Label Group B',
                    productLinks: [products[2], products[3]],
                },
            ]}
            externalLinks={resources}
        />
    </GlobalHeader>
);
