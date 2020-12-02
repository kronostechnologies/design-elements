import { Legend, LegendItem } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

const legendItems: LegendItem[] = [
    {
        name: 'You',
        description: 'Data from your answers',
    },
    {
        name: 'Equisoft Peers',
        description: 'Private Equisoft data',
        color: '#012639',
    },
    {
        name: 'General Peers',
        description: 'Publicly accessible data',
        color: '#094C6C',
    },
];

export default {
    title: 'Results/Legend',
    component: Legend,
};

export const Normal: Story = () => (
    <Legend items={legendItems} />
);
