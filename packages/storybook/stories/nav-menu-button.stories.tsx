import { ApplicationMenu, NavMenuButton, NavMenuOption } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const StyledDiv = styled.div`
    height: 180px;
`;

export default {
    title: 'Navigation/Nav Menu Button',
    component: NavMenuButton,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
};

const options: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

const optionsWithIcons: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
        startIcon: 'home',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
        endIcon: 'externalLink',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
        endIcon: 'externalLink',
    },
];

export const Desktop: Story = () => (
    <ApplicationMenu>
        <NavMenuButton options={options}>Menu</NavMenuButton>
    </ApplicationMenu>
);
Desktop.decorators = [DesktopDecorator];

export const DesktopIconOnly: Story = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton iconOnly iconName="home" options={options} />
        </ApplicationMenu>
    </StyledDiv>
);
DesktopIconOnly.decorators = [DesktopDecorator];

export const DesktopWithIcon: Story = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton iconName="home" options={options}>Home</NavMenuButton>
        </ApplicationMenu>
    </StyledDiv>
);
DesktopWithIcon.decorators = [DesktopDecorator];

export const DesktopInsideShadowDom: Story = () => (
    <ApplicationMenu>
        <NavMenuButton options={options}>Menu</NavMenuButton>
    </ApplicationMenu>
);
DesktopInsideShadowDom.decorators = [DesktopDecorator, ShadowDomDecorator];

export const Mobile: Story = () => (
    <ApplicationMenu>
        <NavMenuButton options={options}>Menu</NavMenuButton>
    </ApplicationMenu>
);
Mobile.decorators = [MobileDecorator];

export const DefaultOpen: Story = () => (
    <ApplicationMenu>
        <NavMenuButton defaultOpen options={options}>Menu</NavMenuButton>
    </ApplicationMenu>
);

export const WithOptionIcons: Story = () => (
    <ApplicationMenu>
        <NavMenuButton options={optionsWithIcons}>Menu</NavMenuButton>
    </ApplicationMenu>
);
