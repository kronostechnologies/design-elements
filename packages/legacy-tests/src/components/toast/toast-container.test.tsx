import { useToasts } from '~//hooks/use-toasts';
import { ToastContainer } from '~/components/toast/toast-container';
import { ToastContextProps } from '~/components/toast/toast-context';
import { ToastTypeEnum } from '~/components/toast/toast-type';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';

jest.mock('~/hooks/use-toasts');

describe('ToastContainer', () => {
    it('should remove toast when dismiss is clicked', () => {
        const removeToast: (id: string) => void = jest.fn();
        jest.mocked(useToasts).mockReturnValue({ removeToast } as ToastContextProps);
        const wrapper = mountWithTheme(
            <ToastContainer id="an id" type="success" message="a message" position="bottom-right" />,
        );

        getByTestId(wrapper, 'dismiss').simulate('click');

        expect(removeToast).toHaveBeenCalled();
    });

    Object.values(ToastTypeEnum).map((type) => (
        it(`should match snapshot (${type})`, () => {
            jest.mocked(useToasts).mockReturnValue({} as ToastContextProps);

            const wrapper = mountWithTheme(
                <ToastContainer id="an id" type={type} message="a message" position="bottom-right" />,
            );

            expect(wrapper).toMatchSnapshot();
        })
    ));
});
