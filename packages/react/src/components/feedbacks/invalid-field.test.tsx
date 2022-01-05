import { renderWithTheme } from '../../test-utils/renderer';
import { InvalidField } from './invalid-field';

describe('Invalid field', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(<InvalidField controlId="test-id" feedbackMsg="Feedback Message" />);

        expect(tree).toMatchSnapshot();
    });
});
