import { range } from '~/components/../utils/range';
import { ProgressTracker, ProgressTrackerStep } from '~/components/progress-tracker/progress-tracker';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

function generateSteps(count: number): ProgressTrackerStep[] {
    return range(1, count).map((i) => ({ label: `Step ${i}` }));
}

describe('Progress Component', () => {
    beforeEach(() => {
        jest.spyOn(console, 'warn').mockImplementation(() => {
        });
    });

    it('should render all steps labels', () => {
        const steps = generateSteps(3);

        const wrapper = mountWithTheme(<ProgressTracker steps={steps} value={1} />);

        const allStepsLabels = findByTestId(wrapper, 'progress-tracker-step-', { modifier: '^' })
            .map((w) => getByTestId(w, 'progress-tracker-label').text());
        expect(allStepsLabels).toEqual(expect.arrayContaining(['Step 1', 'Step 2', 'Step 3']));
    });

    it('should have completed steps', () => {
        const steps = generateSteps(3);

        const wrapper = mountWithTheme(<ProgressTracker steps={steps} value={3} />);

        const completedSteps = findByTestId(wrapper, 'progress-tracker-step-completed')
            .map((w) => getByTestId(w, 'progress-tracker-label').text());
        expect(completedSteps).toEqual(expect.arrayContaining(['Step 1', 'Step 2']));
    });

    it('should have current step', () => {
        const steps = generateSteps(3);

        const wrapper = mountWithTheme(<ProgressTracker steps={steps} value={2} />);

        const currentStep = findByTestId(wrapper, 'progress-tracker-step-current')
            .map((w) => getByTestId(w, 'progress-tracker-label').text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 2']));
    });

    it('should fallback to first step if value is less than 1', () => {
        const steps = generateSteps(3);

        const wrapper = mountWithTheme(<ProgressTracker steps={steps} value={0} />);

        const currentStep = findByTestId(wrapper, 'progress-tracker-step-current')
            .map((w) => getByTestId(w, 'progress-tracker-label').text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 1']));
    });

    it('should fallback to last step if value is higher than number of steps', () => {
        const steps = generateSteps(3);

        const wrapper = mountWithTheme(<ProgressTracker steps={steps} value={4} />);

        const currentStep = findByTestId(wrapper, 'progress-tracker-step-current')
            .map((w) => getByTestId(w, 'progress-tracker-label').text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 3']));
    });

    it('should have uncompleted steps', () => {
        const steps = generateSteps(3);

        const wrapper = mountWithTheme(<ProgressTracker steps={steps} value={1} />);

        const uncompletedStep = findByTestId(wrapper, 'progress-tracker-step-uncompleted')
            .map((w) => getByTestId(w, 'progress-tracker-label').text());
        expect(uncompletedStep).toEqual(expect.arrayContaining(['Step 2', 'Step 3']));
    });
});
