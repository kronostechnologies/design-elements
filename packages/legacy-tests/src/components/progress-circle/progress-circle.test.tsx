import { ProgressCircle } from '~/components/progress-circle/progress-circle';
import { renderWithTheme } from '../../test-utils/renderer';

describe('ProgressCircle', () => {
    it('Matches the snapshot', () => {
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
