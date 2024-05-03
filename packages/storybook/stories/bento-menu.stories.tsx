import { BentoMenuButton, ExternalItemProps, GlobalHeader, NavItemProps } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

const StyledDiv = styled.div`
    height: 540px;
`;

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

const BentoMenuMeta: Meta<typeof BentoMenuButton> = {
    title: 'Components/Bento Menu',
    component: BentoMenuButton,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
    argTypes: {
        inverted: { control: { type: 'boolean' } },
        onMenuVisibilityChanged: { control: { type: null } },
        externalLinks: { control: { type: null } },
        productLinks: { control: { type: null } },
        productGroups: { control: { type: null } },
    },
    render: (args) => (
        <GlobalHeader>
            <BentoMenuButton
                {...args /* eslint-disable-line react/jsx-props-no-spreading */}
                data-testid="some-bento-data-testid"
                productLinks={products}
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
