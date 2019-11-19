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
        color="#0080A5"
        secondary={false}
    />
);
export const secondary = () => (
    <ProgressBar
        descriptionLabel="Equisoft"
        resultLabel="150k - 250k$"
        percent={60}
        color="#012639"
        secondary={true}
    />
);
