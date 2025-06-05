import { noop } from '@tanstack/react-table';
import { renderWithProviders } from '../../test-utils/renderer';
import { range } from '../../utils/range';
import { ProgressTracker, ProgressTrackerStep } from './progress-tracker';

function generateSteps(count: number): ProgressTrackerStep[] {
    return range(1, count).map((i) => ({ label: `Step ${i}` }));
}

describe('Progress Component', () => {
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
});
