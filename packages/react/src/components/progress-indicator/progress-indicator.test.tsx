import { renderWithProviders } from '../../test-utils/testing-library';
import { ProgressIndicator } from './progress-indicator';

describe('ProgressIndicator', () => {
    it('matches snapshot', () => {
        const { asFragment } = renderWithProviders(<ProgressIndicator />);

        expect(asFragment()).toMatchSnapshot();
    });
});
