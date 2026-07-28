import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { SegmentedControl } from './segmented-control';

const buttonGroup = [
    { label: 'Option 1', value: 'option1' },
    { label: 'Option 2', value: 'option2', defaultPressed: true },
    { label: 'Option 3', value: 'option3', disabled: true },
    { label: 'Option 4', value: 'option4' },
];

describe('SegmentedControl', () => {
    it('matches snapshot (desktop)', () => {
        const { container } = renderWithProviders(
            <SegmentedControl buttonGroup={buttonGroup} groupName="Test4" />,
            'desktop',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (mobile)', () => {
        const { container } = renderWithProviders(
            <SegmentedControl buttonGroup={buttonGroup} groupName="Test4" />,
            'mobile',
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('onClick callback is called when clicked', async () => {
        const callback = jest.fn();
        const user = userEvent.setup();

        renderWithProviders(<SegmentedControl onClick={callback} buttonGroup={buttonGroup} groupName="Test1" />);

        await user.click(screen.getByTestId('test-toggle-button-0'));

        expect(callback).toHaveBeenCalled();
    });

    it('Is default pressed', () => {
        renderWithProviders(<SegmentedControl buttonGroup={buttonGroup} groupName="Test2" />);

        expect(screen.getByTestId('test-toggle-button-1')).toHaveAttribute('aria-pressed', 'true');
    });

    it('should have aria-disabled="true" for disabled button', () => {
        renderWithProviders(<SegmentedControl buttonGroup={buttonGroup} groupName="Test" />);

        expect(screen.getByTestId('test-toggle-button-2')).toHaveAttribute('aria-disabled', 'true');
    });
});
