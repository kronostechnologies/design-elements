import { renderWithTheme } from '../../test-utils/renderer';
import { ErrorSummary } from './error-summary';

const errorMessages = [{
    text: 'This is an error',
    targetId: 'error-input',
}, {
    text: 'Another error!',
    targetId: 'error-input-2',
}];

describe('ErrorSummary', () => {
    test('matches the snapshot', () => {
        const tree = renderWithTheme(
            <ErrorSummary messages={errorMessages} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
