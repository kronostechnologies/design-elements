import { GlobalHeader, DropdownNavigation, NavListOption } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';
import { ShadowDomDecorator } from './utils/shadow-dom-decorator';

const StyledDiv = styled.div`
    height: 180px;
`;

export default {
    title: 'Components/Dropdown Navigation',
    component: DropdownNavigation,
    decorators: [RouterDecorator, decorateWith(StyledDiv)],
};

const options: NavListOption[] = [
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

const optionsWithIcons: NavListOption[] = [
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

const optionsWithHtmlLinks: NavListOption[] = [
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

const optionsDisabled: NavListOption[] = [
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
        <DropdownNavigation data-testid="some-data-testid" options={options}>Menu</DropdownNavigation>
    </GlobalHeader>
);
Desktop.decorators = [DesktopDecorator];

export const DesktopIconOnly: Story = () => (
    <StyledDiv>
        <GlobalHeader>
            <DropdownNavigation iconOnly iconName="home" options={options} />
        </GlobalHeader>
    </StyledDiv>
);
DesktopIconOnly.decorators = [DesktopDecorator];

export const DesktopWithIcon: Story = () => (
    <StyledDiv>
        <GlobalHeader>
            <DropdownNavigation iconName="home" options={options}>Home</DropdownNavigation>
        </GlobalHeader>
    </StyledDiv>
);
DesktopWithIcon.decorators = [DesktopDecorator];

export const DesktopInsideShadowDom: Story = () => (
    <GlobalHeader>
        <DropdownNavigation options={options}>Menu</DropdownNavigation>
    </GlobalHeader>
);
DesktopInsideShadowDom.decorators = [DesktopDecorator, ShadowDomDecorator];

export const Mobile: Story = () => (
    <GlobalHeader>
        <DropdownNavigation options={options}>Menu</DropdownNavigation>
    </GlobalHeader>
);
Mobile.decorators = [MobileDecorator];

export const MobileIconOnly: Story = () => (
    <StyledDiv>
        <GlobalHeader>
            <DropdownNavigation iconOnly iconName="home" options={options} />
        </GlobalHeader>
    </StyledDiv>
);
MobileIconOnly.decorators = [MobileDecorator];

export const DefaultOpen: Story = () => (
    <GlobalHeader>
        <DropdownNavigation defaultOpen options={options}>Menu</DropdownNavigation>
    </GlobalHeader>
);

export const WithNavContainer: Story = () => (
    <GlobalHeader>
        <DropdownNavigation tag="nav" options={options}>Menu</DropdownNavigation>
    </GlobalHeader>
);

export const WithOptionIcons: Story = () => (
    <GlobalHeader>
        <DropdownNavigation options={optionsWithIcons}>Menu</DropdownNavigation>
    </GlobalHeader>
);

export const WithHtmlLinks: Story = () => (
    <GlobalHeader>
        <DropdownNavigation options={optionsWithHtmlLinks}>Menu</DropdownNavigation>
    </GlobalHeader>
);

export const WithDisabledOptions: Story = () => (
    <GlobalHeader>
        <DropdownNavigation options={optionsDisabled}>Menu</DropdownNavigation>
    </GlobalHeader>
);
