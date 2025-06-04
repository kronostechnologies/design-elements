import { ProgressIndicator } from '~/components/progress-indicator/progress-indicator';
import { renderWithTheme } from '../../test-utils/renderer';

describe('ProgressIndicator', () => {
    it('Matches the snapshot', () => {
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
