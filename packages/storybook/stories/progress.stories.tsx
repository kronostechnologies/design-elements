import React from 'react';

import { Progress } from '@equisoft/design-elements-react';
import { number } from '@storybook/addon-knobs';

export default {
    title: 'Progress',
    component: Progress,
};

export const beginning = () => (
    <Progress max={number('max', 2)} value={number('value', 0)} />
);
export const middle = () => (
    <Progress max={number('max', 2)} value={number('value', 1)} />
);
export const end = () => (
    <Progress max={number('max', 2)} value={number('value', 2)} />
);
