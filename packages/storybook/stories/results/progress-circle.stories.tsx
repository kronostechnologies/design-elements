import { ProgressCircle } from '@equisoft/design-elements-react';
import React from 'react';

export default {
    title: 'Results/Progress Circle',
    component: ProgressCircle,
};

export const normal = () => (
    <ProgressCircle
        descriptionLabel="RRSP"
        resultLabel="56 k$"
        percent={66}
        color="rgb(101,226,255)"
        secondary={false}
    />
);
export const secondary = () => (
    <ProgressCircle
        descriptionLabel="RRSP"
        resultLabel="56 k$"
        percent={66}
        color="#304E63"
        secondary={true}
    />
);
