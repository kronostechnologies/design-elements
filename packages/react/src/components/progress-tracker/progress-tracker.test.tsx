import { shallow } from 'enzyme';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { renderWithProviders } from '../../test-utils/renderer';
import { range } from '../../utils/range';
import { ProgressTracker, ProgressTrackerStep } from './progress-tracker';

function generateSteps(count: number): ProgressTrackerStep[] {
    return range(1, count).map((i) => ({ label: `Step ${i}` }));
}

describe('Progress Component', () => {
    it('should render all steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={1} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const allSteps = findByTestId(stepsWrapper, 'progress-tracker-step-', '^');
        expect(allSteps.length).toBe(3);
    });

    it('should render all steps labels', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={1} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const allStepsLabels = findByTestId(stepsWrapper, 'progress-tracker-step-', '^')
            .map((w) => findByTestId(w, 'progress-tracker-label').text());
        expect(allStepsLabels).toEqual(expect.arrayContaining(['Step 1', 'Step 2', 'Step 3']));
    });

    it('should have completed steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={3} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const completedSteps = findByTestId(stepsWrapper, 'progress-tracker-step-completed')
            .map((w) => findByTestId(w, 'progress-tracker-label').text());
        expect(completedSteps).toEqual(expect.arrayContaining(['Step 1', 'Step 2']));
    });

    it('should have current step', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={2} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const currentStep = findByTestId(stepsWrapper, 'progress-tracker-step-current')
            .map((w) => findByTestId(w, 'progress-tracker-label').text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 2']));
    });

    it('should fallback to first step if value is less than 1', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={0} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const currentStep = findByTestId(stepsWrapper, 'progress-tracker-step-current')
            .map((w) => findByTestId(w, 'progress-tracker-label').text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 1']));
    });

    it('should fallback to last step if value is higher than number of steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={4} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const currentStep = findByTestId(stepsWrapper, 'progress-tracker-step-current')
            .map((w) => findByTestId(w, 'progress-tracker-label').text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 3']));
    });

    it('should have uncompleted steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<ProgressTracker steps={steps} value={1} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-tracker');

        const uncompletedStep = findByTestId(stepsWrapper, 'progress-tracker-step-uncompleted')
            .map((w) => findByTestId(w, 'progress-tracker-label').text());
        expect(uncompletedStep).toEqual(expect.arrayContaining(['Step 2', 'Step 3']));
    });

    describe('Snapshots', () => {
        it('with labels', () => {
            const steps = generateSteps(3);

            const wrapper = renderWithProviders(<ProgressTracker steps={steps} value={2} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('without labels', () => {
            const steps: ProgressTrackerStep[] = [{}, {}, {}];

            const wrapper = renderWithProviders(<ProgressTracker steps={steps} value={2} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});
