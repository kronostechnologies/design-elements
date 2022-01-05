import { renderWithTheme } from '../../test-utils/renderer';
import { EnsoSpinner } from './enso-spinner';

describe('Enso Spinner', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(<EnsoSpinner />);

        expect(tree).toMatchSnapshot();
    });
});
