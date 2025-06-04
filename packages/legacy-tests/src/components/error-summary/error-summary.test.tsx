import { ErrorMessage, ErrorSummary } from '~/components/error-summary/error-summary';
import { renderWithTheme } from '../../test-utils/renderer';

jest.mock('~/utils/uuid');

const errorMessages: ErrorMessage[] = [{
    text: 'This is an error',
    target: 'error-input',
}, {
    text: 'Another error!',
    target: 'error-input-2',
}];

describe('ErrorSummary', () => {
    it('matches the snapshot', () => {
        const tree = renderWithTheme(
            <ErrorSummary messages={errorMessages} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
