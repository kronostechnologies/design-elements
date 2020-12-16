import { Progress, ProgressStep } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';

export default {
    title: 'Progress',
    component: Progress,
};

function createEmptySteps(count: number): ProgressStep[] {
    const steps: ProgressStep[] = [];
    for (let i = 1; i <= count; i++) {
        steps.push({});
    }
    return steps;
}

function createSteps(count: number): ProgressStep[] {
    const steps: ProgressStep[] = [];
    for (let i = 1; i <= count; i++) {
        steps.push({ label: `Step ${i}` });
    }
    return steps;
}

export const Beginning: Story = () => (
    <Progress steps={createEmptySteps(3)} value={1} />
);

export const Middle: Story = () => (
    <Progress steps={createEmptySteps(3)} value={2} />
);

export const End: Story = () => (
    <Progress steps={createEmptySteps(3)} value={3} />
);

export const WithLabels: Story = () => (
    <Progress steps={createSteps(10)} value={2} />
);
