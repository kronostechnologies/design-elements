import {
    GlobalHeader,
    IconButton,
    NavMenuButton,
    NavMenuOption,
    Select,
    Tooltip,
    TooltipPlacement,
} from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { DesktopDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';
import { RouterDecorator } from './utils/router-decorator';

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

const DesktopPlacementContainer = styled.div`
    height: 240px;
    max-width: 200px;
`;

const DesktopPlacementTooltip = styled(Tooltip)`
    margin-left: 120px;
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
        <DesktopPlacementContainer>
            <Select
                defaultValue="right"
                label="Desktop placement"
                options={placements}
                onChange={(option) => setPlacement(option.value as TooltipPlacement)}
            />
            <DesktopPlacementTooltip desktopPlacement={placement} label="Tooltip Content" />
        </DesktopPlacementContainer>
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
            <GlobalHeader>
                <Tooltip label="Label" desktopPlacement="bottom" disabled={isMenuOpen} delayed>
                    <NavMenuButton iconOnly iconName="info" options={options} onMenuVisibilityChanged={setMenuOpen} />
                </Tooltip>
            </GlobalHeader>
        </Container>
    );
};

WithNavMenuButton.decorators = [RouterDecorator];
