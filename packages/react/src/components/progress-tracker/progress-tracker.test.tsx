import { noop } from '@tanstack/react-table';
import { screen } from '@testing-library/react';
import { renderWithProviders } from '../../test-utils/renderer';
import { range } from '../../utils/range';
import { ProgressTracker, ProgressTrackerStep } from './progress-tracker';

function generateSteps(count: number): ProgressTrackerStep[] {
    return range(1, count).map((i) => ({ label: `Step ${i}` }));
}

describe('ProgressTracker', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(noop);
    });

    describe('Snapshots', () => {
        it('linear', () => {
            const steps = generateSteps(3);

            const { container } = renderWithProviders(<ProgressTracker steps={steps} value={2} />);

            expect(container.firstChild).toMatchSnapshot();
        });

        it('non linear', () => {
            const steps: ProgressTrackerStep[] = [
                { label: 'Step 1', completion: 'completed' },
                { label: 'Step 2', completion: 'uncompleted' },
                { label: 'Step 3' },
                { label: 'Step 4' },
            ];

            const { container } = renderWithProviders(<ProgressTracker steps={steps} value={3} linear={false} />);

            expect(container.firstChild).toMatchSnapshot();
        });
    });

    it('should render all steps labels', () => {
        const steps = generateSteps(3);

        renderWithProviders(<ProgressTracker steps={steps} value={1} />);

        const allStepsLabels = screen.getAllByTestId('progress-tracker-label').map((el) => el.textContent);

        expect(allStepsLabels).toEqual(expect.arrayContaining(['Step 1', 'Step 2', 'Step 3']));
    });

    it('should have completed steps', () => {
        const steps = generateSteps(3);

        renderWithProviders(<ProgressTracker steps={steps} value={3} />);

        const completedSteps = screen.getAllByTestId('progress-tracker-step-completed')
            .map((el) => el.querySelector('[data-testid="progress-tracker-label"]')?.textContent);

        expect(completedSteps).toEqual(expect.arrayContaining(['Step 1', 'Step 2']));
    });

    it('should have current step', () => {
        const steps = generateSteps(3);

        renderWithProviders(<ProgressTracker steps={steps} value={2} />);

        const currentStep = screen.getAllByTestId('progress-tracker-step-current')
            .map((el) => el.querySelector('[data-testid="progress-tracker-label"]')?.textContent);

        expect(currentStep).toEqual(expect.arrayContaining(['Step 2']));
    });

    it('should fallback to first step if value is less than 1', () => {
        const steps = generateSteps(3);

        renderWithProviders(<ProgressTracker steps={steps} value={0} />);

        const currentStep = screen.getAllByTestId('progress-tracker-step-current')
            .map((el) => el.querySelector('[data-testid="progress-tracker-label"]')?.textContent);

        expect(currentStep).toEqual(expect.arrayContaining(['Step 1']));
    });

    it('should fallback to last step if value is higher than number of steps', () => {
        const steps = generateSteps(3);

        renderWithProviders(<ProgressTracker steps={steps} value={4} />);

        const currentStep = screen.getAllByTestId('progress-tracker-step-current')
            .map((el) => el.querySelector('[data-testid="progress-tracker-label"]')?.textContent);

        expect(currentStep).toEqual(expect.arrayContaining(['Step 3']));
    });

    it('should have uncompleted steps', () => {
        const steps = generateSteps(3);

        renderWithProviders(<ProgressTracker steps={steps} value={1} />);

        const uncompletedStep = screen.getAllByTestId('progress-tracker-step-uncompleted')
            .map((el) => el.querySelector('[data-testid="progress-tracker-label"]')?.textContent);

        expect(uncompletedStep).toEqual(expect.arrayContaining(['Step 2', 'Step 3']));
    });
});
