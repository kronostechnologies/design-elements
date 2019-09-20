import React from 'react';

import { Headband } from '@equisoft/design-elements-react';
import { text } from '@storybook/addon-knobs';

export default {
    title: 'Headband',
    component: Headband,
};

export const equisoftDefault = () => (
    <Headband appName={text('appName', 'Benchmark')}>
        {text('children', 'Hello World!')}
    </Headband>
);
