import { renderWithTheme } from '../../test-utils/renderer';
import { ProgressCircular } from './progress-circular';

describe('ProgressCircular', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ProgressCircular value={66} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
