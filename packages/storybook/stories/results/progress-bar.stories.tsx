import { ProgressBar } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Results/Progress Bar',
    component: ProgressBar,
};

export const Normal: Story = () => (
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
