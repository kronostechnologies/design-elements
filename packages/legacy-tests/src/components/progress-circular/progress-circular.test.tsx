import { ProgressCircular } from '~/components/progress-circular/progress-circular';
import { renderWithTheme } from '../../test-utils/renderer';

describe('ProgressCircular', () => {
    it('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ProgressCircular value={66} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
