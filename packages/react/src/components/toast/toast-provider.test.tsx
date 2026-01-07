import { act, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { type FC } from 'react';
import { useToasts } from '../../hooks/use-toasts';
import { renderWithProviders } from '../../test-utils/renderer';

const MESSAGE = 'A message';

const TestConsumer: FC = () => {
    const { addToast, removeToast, toasts } = useToasts();

    return (
        <>
            <button type="button" data-testid="btn-add" onClick={() => addToast('success', MESSAGE)} />
            <button type="button" data-testid="btn-remove" onClick={() => removeToast(toasts[0]?.id || '')} />
            {toasts.map((toast, i) => (
                <div key={toast.id} data-testid={`toast-${i}-message`}>{toast.message}</div>
            ))}
        </>
    );
};

describe('ToastProvider', () => {
    it('should add toast to context', async () => {
        renderWithProviders(<TestConsumer />);

        await userEvent.click(screen.getByTestId('btn-add'));

        const toast = screen.getByTestId('toast-0-message');
        expect(toast).toHaveTextContent(MESSAGE);
    });

    it('should remove toast from context', async () => {
        renderWithProviders(<TestConsumer />);
        await userEvent.click(screen.getByTestId('btn-add'));

        await userEvent.click(screen.getByTestId('btn-remove'));

        expect(screen.queryByTestId('toast-0')).not.toBeInTheDocument();
    });

    it('should remove toast after dismiss time', async () => {
        jest.useFakeTimers();
        const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
        renderWithProviders(<TestConsumer />);
        await user.click(screen.getByTestId('btn-add'));

        act(() => jest.runAllTimers());

        expect(screen.queryByTestId('toast-0')).not.toBeInTheDocument();
        jest.useRealTimers();
    });
});
