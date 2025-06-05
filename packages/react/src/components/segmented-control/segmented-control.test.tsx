import { renderWithProviders } from '../../test-utils/renderer';
import { SegmentedControl } from './segmented-control';

const buttonGroup = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', defaultPressed: true },
    { label: 'Option 3', value: 'option3', disabled: true },
    { label: 'Option 4', value: 'option4' },
];

describe('SegmentedControl', () => {
    test('Matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <SegmentedControl buttonGroup={buttonGroup} groupName="Test4" />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <SegmentedControl buttonGroup={buttonGroup} groupName="Test4" />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
