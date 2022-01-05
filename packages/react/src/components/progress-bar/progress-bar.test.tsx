import { renderWithTheme } from '../../test-utils/renderer';
import { ProgressBar } from './progress-bar';

describe('ProgressBar', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ProgressBar
                color="rgb(101,226,255)"
                descriptionLabel="You"
                resultLabel="50k - 100k$"
                percent={100}
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
