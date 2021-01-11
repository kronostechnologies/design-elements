import { Tooltip } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Tooltip',
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
export const desktopPlacement: Story = () => (
    <>
        <Tooltip desktopPlacement="top">
            Tooltip Content
        </Tooltip>
        <br />
        <Tooltip desktopPlacement="left">
            Tooltip Content
        </Tooltip>
        <br />
        <Tooltip desktopPlacement="right">
            Tooltip Content
        </Tooltip>
        <br />
        <Tooltip desktopPlacement="bottom">
            Tooltip Content
        </Tooltip>
    </>
);
