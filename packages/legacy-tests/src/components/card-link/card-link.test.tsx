import { BrowserRouter as Router } from 'react-router-dom';
import { CardLink } from '~/components/card-link/card-link';
import { renderWithTheme } from '../../test-utils/renderer';

describe('CardLink', () => {
    it('Matches Snapshot', () => {
        const tree = renderWithTheme(
            <Router>
                <CardLink label="Link Label" href="/" />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });
});
