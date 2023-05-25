import { renderWithTheme } from '../../test-utils/renderer';
import { ErrorMessage, ErrorSummary } from './error-summary';

const errorMessages: ErrorMessage[] = [{
    text: 'This is an error',
    target: 'error-input',
}, {
    text: 'Another error!',
    target: 'error-input-2',
}];

describe('ErrorSummary', () => {
    test('matches the snapshot', () => {
        const tree = renderWithTheme(
            <ErrorSummary messages={errorMessages} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
