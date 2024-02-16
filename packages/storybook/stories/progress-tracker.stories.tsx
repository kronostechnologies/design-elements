import { ProgressTracker, ProgressTrackerStep } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { useState } from 'react';
import { rawCodeParameters } from './utils/parameters';

export default {
    title: 'Components/Data/Progress Tracker',
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

export const Normal: Story = () => (
    <ProgressTracker steps={createSteps(3)} value={2} ariaLabel='Storybook progress' />
);

export const Steps: Story = () => (
    <>
        <ProgressTracker steps={createSteps(5)} value={1} ariaLabel='Storybook progress' />
        <ProgressTracker steps={createSteps(5)} value={3} ariaLabel='Storybook progress' />
        <ProgressTracker steps={createSteps(5)} value={5} ariaLabel='Storybook progress' />
    </>
);

export const OnclickEvent: Story = () => {
    const [currentStep, setCurrentStep] = useState(1);

    const steps: ProgressTrackerStep[] = [
        { label: 'Step 1', onClick: (stepNumber) => setCurrentStep(stepNumber) },
        { label: 'Step 2', onClick: (stepNumber) => setCurrentStep(stepNumber) },
        { label: 'Step 3', onClick: (stepNumber) => setCurrentStep(stepNumber) },
    ];
    return <ProgressTracker steps={steps} value={currentStep} ariaLabel='Storybook progress' />;
};

export const HrefLinks: Story = () => {
    const steps: ProgressTrackerStep[] = [
        { label: 'Step 1', href: 'https://equisoft.com' },
        { label: 'Step 2', href: 'https://equisoft.com' },
        { label: 'Step 3', href: 'https://equisoft.com' },
    ];
    return <ProgressTracker steps={steps} value={2} ariaLabel='Storybook progress' />;
};

export const NonLinear: Story = () => {
    const [currentStep, setCurrentStep] = useState(3);

    const steps: ProgressTrackerStep[] = [
        { label: 'Step 1', onClick: (stepNumber) => setCurrentStep(stepNumber), completion: 'completed' },
        { label: 'Step 2', onClick: (stepNumber) => setCurrentStep(stepNumber), completion: 'uncompleted' },
        { label: 'Step 3', onClick: (stepNumber) => setCurrentStep(stepNumber) },
        { label: 'Step 4', onClick: (stepNumber) => setCurrentStep(stepNumber) },
    ];
    return <ProgressTracker linear={false} steps={steps} value={currentStep} ariaLabel='Storybook progress' />;
};
