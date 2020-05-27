import React from 'react';
import { Progress, ProgressStep } from './progress';

export default {
    title: 'Progress',
    component: Progress,
};

export const beginning = () => (
    <Progress steps={createEmptySteps(3)} value={1} />
);

export const middle = () => (
    <Progress steps={createEmptySteps(3)} value={2} />
);
export const end = () => (
    <Progress steps={createEmptySteps(3)} value={3} />
);

export const withLabels = () => (
    <Progress steps={createSteps(10)} value={2} />
);

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
