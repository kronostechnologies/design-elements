import { Circle } from '~/components/progress-circle/circle';
import { renderWithTheme } from '../../test-utils/renderer';

describe('Circle', () => {
    it('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Circle
                radius={73}
                stroke={8}
                percent={55}
                color="#ccc"
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
