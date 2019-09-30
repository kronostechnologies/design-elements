import { Legend } from '@equisoft/design-elements-react';
import React from 'react';

const legendItems = [
    {
        name: 'You',
        description: 'Data from your answers',
    },
    {
        name: 'Equisoft Peers',
        description: 'Private Equisoft data',
        color: '#000014',
    },
    {
        name: 'General Peers',
        description: 'Publicly accessible data',
        color: '#304E63',
    },
];

export default {
    title: 'Results/Legend',
    component: Legend,
};
export const normal = () => (
    <Legend items={legendItems} />
);
