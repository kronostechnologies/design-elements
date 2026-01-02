import { screen, within } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useToasts } from '../../hooks/use-toasts';
import { renderWithProviders } from '../../test-utils/testing-library';
import { type Toast, type ToastContextProps } from './toast-context';
import { ToastTypeEnum } from './toast-type';

jest.mock('../../hooks/use-toasts');

describe('ToastsContainer', () => {
    it('should display toasts in order', async () => {
        const removeToast = jest.fn();
        const toasts: Toast[] = [
            { id: 'an id', type: ToastTypeEnum.NEUTRAL, message: 'a message' },
            { id: 'another id', type: ToastTypeEnum.SUCCESS, message: 'another message' },
        ];
        jest.mocked(useToasts).mockReturnValue({ toasts, removeToast } as unknown as ToastContextProps);

        // ToastContainer is part of the required DS providers
        renderWithProviders(<div />);

        const toastsContainer = screen.getByTestId('toasts');
        expect(toastsContainer.children).toHaveLength(2);

        const toast0 = screen.getByTestId('toast-0');
        const toast1 = screen.getByTestId('toast-1');

        await userEvent.click(within(toast0).getByTestId('dismiss'));
        expect(removeToast).toHaveBeenCalledWith('an id');

        await userEvent.click(within(toast1).getByTestId('dismiss'));
        expect(removeToast).toHaveBeenCalledWith('another id');
    });
});
