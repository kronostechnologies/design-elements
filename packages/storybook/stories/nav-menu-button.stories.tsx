import { ApplicationMenu, NavMenuButton } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import styled from 'styled-components';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

export default {
    title: 'Navigation/Nav Menu Button',
    component: NavMenuButton,
    decorators: [RouterDecorator],
};

const options = [
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

const StyledDiv = styled.div`
    height: 180px;
`;

export const Desktop: Story = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton options={options}>Menu</NavMenuButton>
        </ApplicationMenu>
    </StyledDiv>
);
Desktop.decorators = [DesktopDecorator];

export const DesktopInsideShadowDom: Story = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton options={options}>Menu</NavMenuButton>
        </ApplicationMenu>
    </StyledDiv>
);
DesktopInsideShadowDom.decorators = [DesktopDecorator, ShadowDomDecorator];

export const Mobile: Story = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton options={options}>Menu</NavMenuButton>
        </ApplicationMenu>
    </StyledDiv>
);
Mobile.decorators = [MobileDecorator];

export const DefaultOpen: Story = () => (
    <StyledDiv>
        <ApplicationMenu>
            <NavMenuButton defaultOpen options={options}>Menu</NavMenuButton>
        </ApplicationMenu>
    </StyledDiv>
);
