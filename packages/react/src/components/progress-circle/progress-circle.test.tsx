import { renderWithTheme } from '../../test-utils/renderer';
import { ProgressCircle } from './progress-circle';

describe('ProgressCircle', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <ProgressCircle
                percent={66}
                color="#304E63"
                descriptionLabel="RRSP"
                resultLabel="56 k$"
            />,
        );

        expect(tree).toMatchSnapshot();
    });
});
