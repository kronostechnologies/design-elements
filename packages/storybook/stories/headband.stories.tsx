import React, { ReactElement } from 'react';

import { Headband } from '@equisoft/design-elements-react';
import { BrowserRouter as Router } from 'react-router-dom';

export default {
    title: 'Headband',
    component: Headband,
    decorators: [(storyFn: () => ReactElement) => <Router>{storyFn()}</Router>],
};

export const equisoftDefault = () => (
    <Headband>
        {'Hello World!'}
    </Headband>
);
