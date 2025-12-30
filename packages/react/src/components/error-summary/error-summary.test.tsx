import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createRef } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { ErrorMessage, ErrorSummary } from './error-summary';

jest.mock('../../utils/uuid');

const errorMessages: ErrorMessage[] = [{
    text: 'This is an error',
    target: 'error-input',
}, {
    text: 'Another error!',
    target: 'error-input-2',
}];

describe('ErrorSummary', () => {
    it('matches the snapshot', () => {
        const { asFragment } = renderWithProviders(
            <ErrorSummary messages={errorMessages} />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('renders the error messages', () => {
        renderWithProviders(
            <ErrorSummary messages={errorMessages} />,
        );

        expect(screen.getByText('This is an error')).toBeInTheDocument();
        expect(screen.getByText('Another error!')).toBeInTheDocument();
    });

    it('focuses the target element when clicking on an error with string target', async () => {
        const user = userEvent.setup();
        renderWithProviders(
            <>
                <ErrorSummary messages={errorMessages} />
                <input id="error-input" data-testid="input" />
            </>,
        );

        const errorLink = screen.getByText('This is an error');
        await user.click(errorLink);

        const input = screen.getByTestId('input');
        expect(input).toHaveFocus();
    });

    it('focuses the target element when clicking on an error with ref target', async () => {
        const user = userEvent.setup();
        const ref = createRef<HTMLInputElement>();
        const messagesWithRef: ErrorMessage[] = [{
            text: 'Ref error',
            target: ref,
        }];

        renderWithProviders(
            <>
                <ErrorSummary messages={messagesWithRef} />
                <input ref={ref} id="ref-input" data-testid="input" />
            </>,
        );

        const errorLink = screen.getByText('Ref error');
        await user.click(errorLink);

        const input = screen.getByTestId('input');
        expect(input).toHaveFocus();
    });
});
