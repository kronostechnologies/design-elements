import { renderWithTheme } from '../../../test-utils/renderer';
import { InvalidFieldMessage } from './invalid-field-message';

describe('Invalid field', () => {
    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <InvalidFieldMessage
                id="test-id"
                htmlFor='input-id'
            >
                Feedback Message
            </InvalidFieldMessage>,
        );

        expect(tree).toMatchSnapshot();
    });
});
