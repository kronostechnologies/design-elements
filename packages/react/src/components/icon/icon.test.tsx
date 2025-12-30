import { renderWithProviders } from '../../test-utils/renderer';
import { Icon } from './icon';

describe('Icon', () => {
    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(<Icon name="home" />);

        expect(asFragment()).toMatchSnapshot();
    });
});
