import { renderWithProviders } from '../../test-utils/renderer';
import { ScreenReaderOnlyText } from './ScreenReaderOnlyText';

describe('ScreenReaderOnlyText', () => {
    it('matches snapshot', () => {
        const { asFragment } = renderWithProviders(<ScreenReaderOnlyText label="test" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
