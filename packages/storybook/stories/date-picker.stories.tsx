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
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            alignItems: 'center',
            height: '90vh',
            width: '100%',
        }}
    >
        {/*
        // @ts-ignore */}
        <Datepicker position="bottomRight" />
        {/*
        // @ts-ignore */}
        <Datepicker position="bottomLeft" />
        {/*
        // @ts-ignore */}
        <Datepicker position="topRight" />
        {/*
        // @ts-ignore */}
        <Datepicker position="topLeft" />
    </div>
);
