import { renderWithTheme } from '../../test-utils/renderer';
import { Bar } from './bar';

describe('Bar', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Bar
                color="#ccc"
                endLabel="20k"
                percent={55}
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
