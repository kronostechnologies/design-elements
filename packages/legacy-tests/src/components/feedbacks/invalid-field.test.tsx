import { InvalidField } from '~/components/feedbacks/invalid-field';
import { renderWithTheme } from '../../test-utils/renderer';

describe('Invalid field', () => {
    it('Matches the snapshot', () => {
        const tree = renderWithTheme(<InvalidField controlId="test-id" feedbackMsg="Feedback Message" />);

        expect(tree).toMatchSnapshot();
    });
});
