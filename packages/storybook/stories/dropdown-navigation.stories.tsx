import { GlobalHeader, DropdownNavigation, NavListOption } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';
import { decorateWith } from './utils/decorator';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

const StyledDiv = styled.div`
    height: 180px;
`;

export default {
    title: 'Core/Dropdown Navigation',
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
