import { Progress, ProgressTracker } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';

export default {
    title: 'Data/Progress Tracker',
    component: Progress,
};

function createEmptySteps(count: number): ProgressTracker[] {
    const steps: ProgressTracker[] = [];
    for (let i = 1; i <= count; i++) {
        steps.push({});
    }
    return steps;
}

function createSteps(count: number): ProgressTracker[] {
    const steps: ProgressTracker[] = [];
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
