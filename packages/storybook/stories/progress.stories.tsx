import React from 'react';

import { Progress } from '@equisoft/design-elements-react';

export default {
    title: 'Progress',
    component: Progress,
};

export const beginning = () => (
    <div>
        <h3 style={{ marginTop: '0' }} >Begining</h3>
        <Progress max={2} value={0} />
        <h3>Middle</h3>
        <Progress max={2} value={1} />
        <h3>End</h3>
        <Progress max={2} value={2} />
    </div>
);
