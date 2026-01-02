import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { useToasts } from '../../hooks/use-toasts';
import { renderWithProviders } from '../../test-utils/renderer';
import { ToastContainer } from './toast-container';
import { ToastContextProps } from './toast-context';
import { ToastTypeEnum } from './toast-type';

jest.mock('../../hooks/use-toasts');

describe('ToastContainer', () => {
    it('should remove toast when dismiss is clicked', async () => {
        const user = userEvent.setup();
        const removeToast = jest.fn();
        jest.mocked(useToasts).mockReturnValue({ removeToast, toasts: [] } as unknown as ToastContextProps);

        renderWithProviders(
            <ToastContainer id="an id" type="success" message="a message" position="bottom-right" />,
        );

        await user.click(screen.getByTestId('dismiss'));

        expect(removeToast).toHaveBeenCalled();
    });

    Object.values(ToastTypeEnum).forEach((type) => {
        it(`should match snapshot (${type})`, () => {
            jest.mocked(useToasts).mockReturnValue({ toasts: [] } as unknown as ToastContextProps);

            const { asFragment } = renderWithProviders(
                <ToastContainer id="an id" type={type} message="a message" position="bottom-right" />,
            );

            expect(asFragment()).toMatchSnapshot();
        });
    });
});
