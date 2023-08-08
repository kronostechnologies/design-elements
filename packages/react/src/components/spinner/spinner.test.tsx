import { renderWithTheme } from '../../test-utils/renderer';
import { Spinner } from './spinner';

describe('Spinner', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(<Spinner />);

        expect(tree).toMatchSnapshot();
    });
});
