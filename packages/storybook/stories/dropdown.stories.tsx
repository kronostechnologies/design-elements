import React from 'react';

import { Dropdown } from '@equisoft/design-elements-react';

export default {
    title: 'Dropdown',
    component: Dropdown,
};

export const normal = () => (
    <Dropdown/>
);

export const disabled = () => (
    <Dropdown disabled/>
);
