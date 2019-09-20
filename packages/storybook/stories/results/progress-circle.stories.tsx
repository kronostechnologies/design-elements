import { ProgressCircle } from '@equisoft/design-elements-react';
import { boolean, color, number, text } from '@storybook/addon-knobs';
import React from 'react';

export default {
    title: 'Results/Progress Circle',
    component: ProgressCircle,
};

export const normal = () => (
    <ProgressCircle
        descriptionLabel={text('descriptionLabel', 'RRSP')}
        resultLabel={text('resultLabel', '56 k$')}
        percent={number('percent', 66)}
        color={color('color', 'rgb(101,226,255)')}
        secondary={boolean('secondary', false)}
    />
);
export const secondary = () => (
    <ProgressCircle
        descriptionLabel={text('descriptionLabel', 'RRSP')}
        resultLabel={text('resultLabel', '56 k$')}
        percent={number('percent', 66)}
        color={color('color', '#304E63')}
        secondary={boolean('secondary', true)}
    />
);
