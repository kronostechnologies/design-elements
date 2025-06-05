import { Bar } from '~/components/progress-indicator/bar';
import { renderWithTheme } from '../../test-utils/renderer';

describe('Bar', () => {
    it('Matches the snapshot', () => {
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
