import { renderWithTheme } from '../../test-utils/renderer';
import { Circle } from './circle';

describe('Circle', () => {
    test('Matches the snapshot', () => {
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
