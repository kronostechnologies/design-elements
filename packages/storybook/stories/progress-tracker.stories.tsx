import { ProgressTracker, ProgressTrackerStep } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Data/Progress Tracker',
    component: ProgressTracker,
    parameters: rawCodeParameters,

};

function createEmptySteps(count: number): ProgressTrackerStep[] {
    const steps: ProgressTrackerStep[] = [];
    for (let i = 1; i <= count; i++) {
        steps.push({});
    }
    return steps;
}

function createSteps(count: number): ProgressTrackerStep[] {
    const steps: ProgressTrackerStep[] = [];
    for (let i = 1; i <= count; i++) {
        steps.push({ label: `Step ${i}` });
    }
    return steps;
}

export const Normal: Story = () => (
    <ProgressTracker steps={createEmptySteps(3)} value={2} />
);

export const Steps: Story = () => (
    <>
        <ProgressTracker steps={createEmptySteps(3)} value={1} />
        <ProgressTracker steps={createEmptySteps(3)} value={2} />
        <ProgressTracker steps={createEmptySteps(3)} value={3} />
    </>
);

export const WithLabels: Story = () => (
    <ProgressTracker steps={createSteps(10)} value={4} />
);

export const AriaLabel: Story = () => (
    <ProgressTracker
        steps={createEmptySteps(3)}
        value={2}
        ariaLabel="Create account steps"
    />
);

export const OnclickEvent: Story = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps: ProgressTrackerStep[] = [
        { label: 'Step 1', onClick: (stepNumber) => setCurrentStep(stepNumber) },
        { label: 'Step 2', onClick: (stepNumber) => setCurrentStep(stepNumber) },
        { label: 'Step 3', onClick: (stepNumber) => setCurrentStep(stepNumber) },
    ];
    return <ProgressTracker steps={steps} value={currentStep} />;
};

export const HrefLinks: Story = () => {
    const steps: ProgressTrackerStep[] = [
        { label: 'Step 1', href: 'https://equisoft.com' },
        { label: 'Step 2', href: 'https://equisoft.com' },
        { label: 'Step 3', href: 'https://equisoft.com' },
    ];
    return <ProgressTracker steps={steps} value={2} />;
};

export const NonLinear: Story = () => {
    const [currentStep, setCurrentStep] = useState(3);

    const steps: ProgressTrackerStep[] = [
        { label: 'Step 1', onClick: (stepNumber) => setCurrentStep(stepNumber), nonLinearState: 'completed' },
        { label: 'Step 2', onClick: (stepNumber) => setCurrentStep(stepNumber), nonLinearState: 'incomplete' },
        { label: 'Step 3', onClick: (stepNumber) => setCurrentStep(stepNumber) },
        { label: 'Step 4', onClick: (stepNumber) => setCurrentStep(stepNumber), nonLinearState: 'default' },
    ];
    return <ProgressTracker linear={false} steps={steps} value={currentStep} />;
};
