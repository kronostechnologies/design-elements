import React from 'react';

import { Datepicker } from '@equisoft/design-elements-react';

export default {
    title: 'Datepicker',
    component: Datepicker,
};

export const normal = () => (
    <div
        style={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '60vh',
            width: '100%',
        }}
    >
        <Datepicker />
    </div>
);
