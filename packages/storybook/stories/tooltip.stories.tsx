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

export const click = () => (
    <Tooltip trigger="click">
        Tooltip Content
    </Tooltip>
);
export const top = () => (
    <Tooltip placement="top">
        Tooltip Content
    </Tooltip>
);
export const bottom = () => (
    <Tooltip placement="bottom">
        Tooltip Content
    </Tooltip>
);
export const left = () => (
    <Tooltip placement="left">
        Tooltip Content
    </Tooltip>
);
export const rightClick = () => (
    <Tooltip trigger="right-click">
        Tooltip Content
    </Tooltip>
);
