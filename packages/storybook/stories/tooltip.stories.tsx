import {
    IconButton,
    NavMenuOption,
    NavMenuButton,
    Select,
    Tooltip,
    TooltipPlacement,
} from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { useState } from 'react';
import styled from 'styled-components';
import { DesktopDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';

const StyledDiv = styled.div`
    height: 240px;
    max-width: 200px;
`;

export default {
    title: 'Disclosure/Tooltip',
    component: Tooltip,
};

export const Normal: Story = () => (
    <Tooltip label="Tooltip Content" />
);

export const DefaultOpen: Story = () => (
    <Tooltip defaultOpen label="Tooltip Content" />
);

export const WithChildElement: Story = () => (
    <Tooltip label="Go to settings page">
        <IconButton buttonType="primary" label="settings" iconName="settings" />
    </Tooltip>
);

const options: NavMenuOption[] = [
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

const MenuTooltipContainer = styled.div`
    padding-bottom: 100px;
    padding-left: 150px;
`;

const StyledNavMenuButton = styled(NavMenuButton)`
    button {
        background-color: ${({ theme }) => theme.main['primary-1.1']};
    }
`;

export const MenuTooltip: Story = () => (
    <MenuTooltipContainer>
        <Tooltip label="Menu">
            <StyledNavMenuButton options={options} />
        </Tooltip>
    </MenuTooltipContainer>
);

export const DesktopPlacement: Story = () => {
    const [placement, setPlacement] = useState<TooltipPlacement>('right');

    interface Placements {
        value: TooltipPlacement;
        label: TooltipPlacement;
    }
    const placements: Placements[] = [
        { value: 'top', label: 'top' },
        { value: 'right', label: 'right' },
        { value: 'bottom', label: 'bottom' },
        { value: 'left', label: 'left' },
    ];

    return (
        <StyledDiv>
            <Select
                defaultValue="right"
                label="Desktop placement"
                options={placements}
                onChange={(option) => setPlacement(option.value as TooltipPlacement)}
            />
            <Tooltip desktopPlacement={placement} label="Tooltip Content" />
        </StyledDiv>
    );
};
DesktopPlacement.decorators = [DesktopDecorator];
DesktopPlacement.parameters = rawCodeParameters;
