import { ProgressBar } from '@equisoft/design-elements-react';
import { boolean, color, number, text } from '@storybook/addon-knobs';
import React from 'react';

export default {
    title: 'Results/Progress Bar',
    component: ProgressBar,
};

export const normal = () => (
    <ProgressBar
        descriptionLabel={text('descriptionLabel', 'You')}
        resultLabel={text('resultLabel', '50k - 100k$')}
        percent={number('percent', 100)}
        color={color('color', 'rgb(101,226,255)')}
        secondary={boolean('secondary', false)}
    />
);
export const secondary = () => (
    <ProgressBar
        descriptionLabel={text('descriptionLabel', 'Equisoft')}
        resultLabel={text('resultLabel', '150k - 250k$')}
        percent={number('percent', 60)}
        color={color('color', 'rgb(38, 50, 56)')}
        secondary={boolean('secondary', true)}
    />
);
