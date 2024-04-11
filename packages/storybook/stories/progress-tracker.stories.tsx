import { ProgressTracker, ProgressTrackerStep } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Progress Tracker',
    component: ProgressTracker,
    parameters: rawCodeParameters,

};

function createSteps(count: number): ProgressTrackerStep[] {
    const steps: ProgressTrackerStep[] = [];
    for (let i = 1; i <= count; i++) {
        steps.push({ label: `Step ${i}` });
    }
    return steps;
}

export const Default: Story = () => (
    <ProgressTracker steps={createSteps(3)} value={2} ariaLabel='Storybook progress' />
);
