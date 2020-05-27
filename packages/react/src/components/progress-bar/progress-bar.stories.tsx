import React from 'react';
import { ProgressBar } from './progress-bar';

export default {
    title: 'Results/Progress Bar',
    component: ProgressBar,
};

export const normal = () => (
    <>
        <ProgressBar
            descriptionLabel="You"
            resultLabel="50k - 100k $"
            percent={60}
            color="#0080A5"
        />
        <ProgressBar
            descriptionLabel="Equisoft"
            resultLabel="150k - 250k $"
            percent={100}
            color="#012639"
        />
    </>
);
