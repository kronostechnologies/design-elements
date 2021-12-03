import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { Circle } from './circle';

describe('Circle', () => {
    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(
                <Circle
                    radius={73}
                    stroke={8}
                    percent={55}
                    color="#ccc"
                />,
            ),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
