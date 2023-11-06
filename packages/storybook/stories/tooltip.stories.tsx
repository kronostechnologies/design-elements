import {
    GlobalHeader,
    IconButton,
    DropdownNavigation,
    NavListOption,
    DropdownList,
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

const DarkDiv = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.main['primary-1.1']};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
`;

export const Normal: Story = () => (
    <Tooltip label="Tooltip Content" />
);

export const DefaultOpen: Story = () => (
    <Tooltip defaultOpen label="Tooltip Content" />
);

export const Delayed: Story = () => (
    <Tooltip label="Tooltip Content" delayed />
);

export const InvertedIcon: Story = () => (
    <DarkDiv>
        <Tooltip label="Tooltip Content" invertedIcon desktopPlacement="left" />
    </DarkDiv>
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
            <DropdownList
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

const options: NavListOption[] = [
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

export const WithDropdownNavigation: Story = () => {
    const [isDropdownexpanded, setDropdownExpanded] = useState(false);

    return (
        <Container>
            <GlobalHeader>
                <Tooltip label="Label" desktopPlacement="bottom" disabled={isDropdownexpanded} delayed>
                    <DropdownNavigation
                        iconOnly
                        iconName="info"
                        options={options}
                        onDropdownVisibilityChanged={setDropdownExpanded}
                    />
                </Tooltip>
            </GlobalHeader>
        </Container>
    );
};

WithDropdownNavigation.decorators = [RouterDecorator];

export const WithConfirmation: Story = () => {
    const handleOnClick = (): void => {
        console.info('onclick');
    };

    return (
        <Container>
            <Tooltip
                label="label"
                confirmationLabel="label confirmation"
                onClick={handleOnClick}
                desktopPlacement="bottom"
                variant='success'
            >
                JBSW Y3DP EHPK 3PXP
            </Tooltip>
        </Container>
    );
};
