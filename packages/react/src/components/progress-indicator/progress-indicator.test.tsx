import { renderWithTheme } from '../../test-utils/renderer';
import { ProgressIndicator } from './progress-indicator';

describe('ProgressIndicator', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ProgressIndicator
                color="rgb(101,226,255)"
                descriptionLabel="You"
                resultLabel="50k - 100k$"
                percent={100}
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
