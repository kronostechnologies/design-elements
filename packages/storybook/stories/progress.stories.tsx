import React from 'react';

import { Progress } from '@equisoft/design-elements-react';

export default {
    title: 'Progress',
    component: Progress,
};

export const beginning = () => (
    <Progress max={2} value={0} />
);

export const middle = () => (
     <Progress max={2} value={1} />
);
export const end = () => (
    <Progress max={2} value={2} />
);
