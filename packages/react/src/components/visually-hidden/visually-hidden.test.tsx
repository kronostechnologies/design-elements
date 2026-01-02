import { renderWithProviders } from '../../test-utils/renderer';
import { VisuallyHidden } from './visually-hidden';

describe('VisuallyHidden', () => {
    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <VisuallyHidden>
                Hidden
            </VisuallyHidden>,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
