import {
    ApplicationMenu,
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
import { RouterDecorator } from './utils/router-decorator';
import { rawCodeParameters } from './utils/parameters';

const Container = styled.div`
    height: 100px;
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

export const Delayed: Story = () => (
    <Tooltip label="Tooltip Content" delayed />
);

export const WithChildElement: Story = () => (
    <Container>
        <Tooltip label="Go to settings page" desktopPlacement="bottom">
            <IconButton buttonType="primary" label="settings" iconName="settings" />
        </Tooltip>
    </Container>
);

const StyledDiv = styled.div`
    height: 240px;
    max-width: 200px;
`;

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

export const WithNavMenuButton: Story = () => {
    const [isMenuOpen, setMenuOpen] = useState(false);

    return (
        <Container>
            <ApplicationMenu>
                <Tooltip label="Label" desktopPlacement="bottom" disabled={isMenuOpen} delayed>
                    <NavMenuButton iconOnly iconName="info" options={options} onMenuVisibilityChanged={setMenuOpen} />
                </Tooltip>
            </ApplicationMenu>
        </Container>
    );
};

WithNavMenuButton.decorators = [RouterDecorator];
