import { ApplicationMenu, BentoMenuButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';
import { ExternalItemProps, NavItemProps } from '../../react/src/components/dropdown-menu/list-items';

const StyledDiv = styled.div`
    height: 180px;
`;

export default {
    title: 'Navigation/Bento Menu',
    component: BentoMenuButton,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
};

const products: NavItemProps[] = [
    {
        id: 'connect',
        value: 'connect',
        to: 'connect',
        label: '/Connect',
        description: 'Short app description',
    },
    {
        id: 'plan',
        value: 'plan',
        to: 'plan',
        label: '/Plan',
        description: 'Way to long app description to bust the max-width limit of the dropdown',
    },
    {
        id: 'analyze',
        value: 'analyze',
        to: 'analyze',
        label: '/Analyze',
        description: 'Short app description',
    },
];

const resources: ExternalItemProps[] = [
    {
        id: 'calculatrice',
        href: 'https://calculatrices-financieres.ca/',
        label: 'Calculatrice financière',
    },
    {
        id: 'comparateur',
        href: 'https://www.moncomparateurfinancier.com/',
        label: 'Mon comparateur financier',
    },
    {
        id: 'google',
        href: 'https://www.google.com/',
        label: 'Way to long app link to bust the max-width limit of the dropdown',
    },
];

export const Desktop: Story = () => (
    <ApplicationMenu>
        <BentoMenuButton productLinks={products} externalLinks={resources} />
    </ApplicationMenu>
);
Desktop.decorators = [DesktopDecorator];
