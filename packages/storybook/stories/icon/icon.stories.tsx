import React from 'react';

import { Icon } from '@equisoft/design-elements-react';

export default {
    title: 'Icon',
    component: Icon,
};

export const icon = () => (
    <Icon name="alertTriangle" />
);

export const withColor = () => (
    <Icon name="alertTriangle" color="orange" />
);

export const withSize = () => (
    <Icon name="alertTriangle" size="78" />
);
