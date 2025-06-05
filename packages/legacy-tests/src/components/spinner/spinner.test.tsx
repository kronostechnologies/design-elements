import { Spinner } from '~/components/spinner/spinner';
import { renderWithTheme } from '../../test-utils/renderer';

describe('Spinner', () => {
    it('Matches the snapshot', () => {
        const tree = renderWithTheme(<Spinner />);

        expect(tree).toMatchSnapshot();
    });
});
