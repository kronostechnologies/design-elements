import { Select, Tooltip, TooltipPlacement } from '@equisoft/design-elements-react';
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
    <Tooltip>
        Tooltip Content
    </Tooltip>
);

export const DefaultOpen: Story = () => (
    <Tooltip defaultOpen>
        Tooltip Content
    </Tooltip>
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
            <Tooltip desktopPlacement={placement}>
                Tooltip Content
            </Tooltip>
        </StyledDiv>
    );
};
DesktopPlacement.decorators = [DesktopDecorator];
DesktopPlacement.parameters = rawCodeParameters;
