import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { SkipLink } from './skip-link';

describe('SkipLink', () => {
    it('matches Snapshot (Desktop)', () => {
        const { container } = renderWithProviders(<SkipLink href="test" />, 'desktop');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches Snapshot (Mobile)', () => {
        const { container } = renderWithProviders(<SkipLink href="test" />, 'mobile');

        expect(container.firstChild).toMatchSnapshot();
    });

    it('should call onClick callback when clicked', async () => {
        const callback = jest.fn();
        renderWithProviders(<SkipLink href="#test" onClick={callback} />);

        await userEvent.click(screen.getByRole('link'));

        expect(callback).toHaveBeenCalled();
    });
});
