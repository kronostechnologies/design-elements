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
export const TopPlacement: Story = () => (
    <Tooltip placement="top">
        Tooltip Content
    </Tooltip>
);
export const BottomPlacement: Story = () => (
    <Tooltip placement="bottom">
        Tooltip Content
    </Tooltip>
);
export const LeftPlacement: Story = () => (
    <Tooltip placement="left">
        Tooltip Content
    </Tooltip>
);
