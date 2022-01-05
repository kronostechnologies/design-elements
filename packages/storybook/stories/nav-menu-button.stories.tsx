import { GlobalHeader, NavMenuButton, NavMenuOption } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
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

const optionsWithHtmlLinks: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
        isHtmlLink: true,
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
        isHtmlLink: true,
    },
];

const optionsDisabled: NavMenuOption[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
        disabled: true,
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
        disabled: true,
    },
];

export const Desktop: Story = () => (
    <GlobalHeader>
        <NavMenuButton options={options}>Menu</NavMenuButton>
    </GlobalHeader>
);
Desktop.decorators = [DesktopDecorator];

export const DesktopIconOnly: Story = () => (
    <StyledDiv>
        <GlobalHeader>
            <NavMenuButton iconOnly iconName="home" options={options} />
        </GlobalHeader>
    </StyledDiv>
);
DesktopIconOnly.decorators = [DesktopDecorator];

export const DesktopWithIcon: Story = () => (
    <StyledDiv>
        <GlobalHeader>
            <NavMenuButton iconName="home" options={options}>Home</NavMenuButton>
        </GlobalHeader>
    </StyledDiv>
);
DesktopWithIcon.decorators = [DesktopDecorator];

export const DesktopInsideShadowDom: Story = () => (
    <GlobalHeader>
        <NavMenuButton options={options}>Menu</NavMenuButton>
    </GlobalHeader>
);
DesktopInsideShadowDom.decorators = [DesktopDecorator, ShadowDomDecorator];

export const Mobile: Story = () => (
    <GlobalHeader>
        <NavMenuButton options={options}>Menu</NavMenuButton>
    </GlobalHeader>
);
Mobile.decorators = [MobileDecorator];

export const MobileIconOnly: Story = () => (
    <StyledDiv>
        <GlobalHeader>
            <NavMenuButton iconOnly iconName="home" options={options} />
        </GlobalHeader>
    </StyledDiv>
);
MobileIconOnly.decorators = [MobileDecorator];

export const DefaultOpen: Story = () => (
    <GlobalHeader>
        <NavMenuButton defaultOpen options={options}>Menu</NavMenuButton>
    </GlobalHeader>
);

export const WithNavContainer: Story = () => (
    <GlobalHeader>
        <NavMenuButton tag="nav" options={options}>Menu</NavMenuButton>
    </GlobalHeader>
);

export const WithOptionIcons: Story = () => (
    <GlobalHeader>
        <NavMenuButton options={optionsWithIcons}>Menu</NavMenuButton>
    </GlobalHeader>
);

export const WithHtmlLinks: Story = () => (
    <GlobalHeader>
        <NavMenuButton options={optionsWithHtmlLinks}>Menu</NavMenuButton>
    </GlobalHeader>
);

export const WithDisabledOptions: Story = () => (
    <GlobalHeader>
        <NavMenuButton options={optionsDisabled}>Menu</NavMenuButton>
    </GlobalHeader>
);
