import React from 'react';

import { Tooltip } from '@equisoft/design-elements-react';

export default {
    title: 'Tooltip',
    component: Tooltip,
};

export const normal = () => (
    <Tooltip>
        Tooltip Content
    </Tooltip>
);

export const defaultOpen = () => (
    <Tooltip defaultOpen>
        Tooltip Content
    </Tooltip>
);
export const mobile = () => (
    <Tooltip device="mobile">
        Tooltip Content
    </Tooltip>
);
export const topPlacement = () => (
    <Tooltip placement="top">
        Tooltip Content
    </Tooltip>
);
export const bottomPlacement = () => (
    <Tooltip placement="bottom">
        Tooltip Content
    </Tooltip>
);
export const leftPlacement = () => (
    <Tooltip placement="left">
        Tooltip Content
    </Tooltip>
);
export const clickTrigger = () => (
    <Tooltip trigger="click">
        Tooltip Content
    </Tooltip>
);
export const rightClickTrigger = () => (
    <Tooltip trigger="right-click">
        Tooltip Content
    </Tooltip>
);
