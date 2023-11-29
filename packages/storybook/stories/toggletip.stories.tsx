import {
    DropdownList,
    Toggletip,
    ToggletipPlacement,
    ExternalLink,
} from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import styled from 'styled-components';
import { DesktopDecorator } from './utils/device-context-decorator';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Disclosure/Toggletip',
    component: Toggletip,
};

export const Normal: Story = () => (
    <Toggletip desktopPlacement="left">Toggletip Content</Toggletip>
);

export const DefaultOpen: Story = () => (
    <Toggletip defaultOpen>Toggletip Content</Toggletip>
);

export const Disabled: Story = () => (
    <Toggletip disabled>Toggletip Content</Toggletip>
);

const StyledDiv = styled.div`
    height: 240px;
    max-width: 200px;
`;

const DarkDiv = styled.div`
    align-items: center;
    background-color: ${({ theme }) => theme.main['primary-1.1']};
    display: flex;
    height: 50px;
    justify-content: center;
    width: 100%;
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
            <DropdownList
                defaultValue="right"
                label="Desktop placement"
                options={placements}
                onChange={(option) => setPlacement(option.value as ToggletipPlacement)}
            />
            <Toggletip desktopPlacement={placement}>Toggletip Content</Toggletip>
        </StyledDiv>
    );
};
DesktopPlacement.decorators = [DesktopDecorator];
DesktopPlacement.parameters = rawCodeParameters;

export const LinkInContent: Story = () => (
    <Toggletip>
        Link
        <ExternalLink label="https://google.ca/" href="https://google.ca/" />
    </Toggletip>
);

export const InvertedIcon: Story = () => (
    <DarkDiv>
        <Toggletip invertedIcon>Toggletip Content</Toggletip>
    </DarkDiv>
);
