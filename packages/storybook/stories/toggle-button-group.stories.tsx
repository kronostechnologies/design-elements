import React from 'react';

import { ToggleButtonGroup } from '@equisoft/design-elements-react';

const buttonGroup = [
    {
        value: 'zest1',
        label: 'Zest 1',
        disabled: true,
    },
    {
        value: 'zest2',
        label: 'Zest 2',
    },
    {
        value: 'zest3',
        label: 'Zest 3',
    },
    {
        value: 'zest4',
        label: 'Zest 4',
    },
];

export default {
    title: 'Toggle Button Group',
    component: ToggleButtonGroup,
};

export const toggleButtonGroup = () => (
    <ToggleButtonGroup groupName="Test" buttonGroup={buttonGroup}/>
);
