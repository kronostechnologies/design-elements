import {
    GlobalHeader,
    IconButton,
    NavMenuButton,
    NavMenuOption,
    Select,
    Toggletip,
    ToggletipPlacement,
} from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { DesktopDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';
import { RouterDecorator } from './utils/router-decorator';

const Container = styled.div`
    height: 100px;
`;

export default {
    title: 'Disclosure/Toggletip',
    component: Toggletip,
};

export const Normal: Story = () => (
    <Toggletip label="Tooltip Content" />
);

export const DefaultOpen: Story = () => (
    <Toggletip defaultOpen label="Tooltip Content" />
);

export const WithChildElement: Story = () => (
    <Container>
        <Toggletip label="Go to settings page" desktopPlacement="bottom">
            <IconButton buttonType="primary" label="settings" iconName="settings" />
        </Toggletip>
    </Container>
);

const StyledDiv = styled.div`
    height: 240px;
    max-width: 200px;
`;

export const DesktopPlacement: Story = () => {
    const [placement, setPlacement] = useState<ToggletipPlacement>('right');

    interface Placements {
        value: ToggletipPlacement;
        label: ToggletipPlacement;
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
                onChange={(option) => setPlacement(option.value as ToggletipPlacement)}
            />
            <Toggletip desktopPlacement={placement} label="Tooltip Content" />
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
            <GlobalHeader>
                <Toggletip label="Label" desktopPlacement="bottom" disabled={isMenuOpen}>
                    <NavMenuButton iconOnly iconName="info" options={options} onMenuVisibilityChanged={setMenuOpen} />
                </Toggletip>
            </GlobalHeader>
        </Container>
    );
};

WithNavMenuButton.decorators = [RouterDecorator];
