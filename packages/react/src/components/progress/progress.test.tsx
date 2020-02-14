import { findByTestId, getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { range } from '@design-elements/utils/range';
import { shallow } from 'enzyme';
import React from 'react';
import { renderWithTheme } from '../../test-utils/theme-wrapped';
import { Progress, ProgressStep } from './progress';

describe('Progress Component', () => {
    it('should render all steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={1} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const allSteps = findByTestId(stepsWrapper, 'progress-step-', '^');
        expect(allSteps.length).toBe(3);
    });

    it('should render all steps labels', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={1} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const allStepsLabels = findByTestId(stepsWrapper, 'progress-step-', '^').map(w => w.text());
        expect(allStepsLabels).toEqual(expect.arrayContaining(['Step 1', 'Step 2', 'Step 3']));
    });

    it('should have past steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={3} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const pastSteps = findByTestId(stepsWrapper, 'progress-step-past').map(w => w.text());
        expect(pastSteps).toEqual(expect.arrayContaining(['Step 1', 'Step 2']));
    });

    it('should have current step', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={2} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const currentStep = findByTestId(stepsWrapper, 'progress-step-current').map(w => w.text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 2']));
    });

    it('should fallback to first step if value is less than 1', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={0} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const currentStep = findByTestId(stepsWrapper, 'progress-step-current').map(w => w.text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 1']));
    });

    it('should fallback to last step if value is higher than number of steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={4} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const currentStep = findByTestId(stepsWrapper, 'progress-step-current').map(w => w.text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 3']));
    });

    it('should have future steps', () => {
        const steps = generateSteps(3);

        const wrapper = shallow(<Progress steps={steps} value={1} />);
        const stepsWrapper = getByTestId(wrapper, 'progress-steps');

        const currentStep = findByTestId(stepsWrapper, 'progress-step-future').map(w => w.text());
        expect(currentStep).toEqual(expect.arrayContaining(['Step 2', 'Step 3']));
    });

    describe('Snapshots', () => {
        it('with labels', () => {
            const steps = generateSteps(3);

            const wrapper = renderWithTheme(<Progress steps={steps} value={2} />);

            expect(wrapper).toMatchSnapshot();
        });

        it('without labels', () => {
            const steps: ProgressStep[] = [{}, {}, {}];

            const wrapper = renderWithTheme(<Progress steps={steps} value={2} />);

            expect(wrapper).toMatchSnapshot();
        });
    });
});

function generateSteps(count: number): ProgressStep[] {
    return range(1, count).map(i => ({ label: `Step ${i}` }));
}
