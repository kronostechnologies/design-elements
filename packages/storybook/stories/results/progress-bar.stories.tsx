import { ProgressBar } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Results/Progress Bar',
    component: ProgressBar,
};

export const normal = () => (
    <ProgressBar
        descriptionLabel="You"
        resultLabel="50k - 100k$"
        percent={100}
        color="rgb(101,226,255)"
        secondary={false}
    />
);
export const secondary = () => (
    <ProgressBar
        descriptionLabel="Equisoft"
        resultLabel="150k - 250k$"
        percent={60}
        color="rgb(38, 50, 56)"
        secondary={true}
    />
);
