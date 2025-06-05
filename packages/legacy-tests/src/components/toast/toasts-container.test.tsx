import { shallow } from 'enzyme';
import { useToasts } from '~/hooks/use-toasts';
import { Toast, ToastContextProps } from '~/components/toast/toast-context';
import { ToastTypeEnum } from '~/components/toast/toast-type';
import { ToastsContainer } from '~/components/toast/toasts-container';
import { getByTestId } from '../../test-utils/enzyme-selectors';

jest.mock('~/hooks/use-toasts');

describe('ToastsContainer', () => {
    it('should display toasts in order', () => {
        const toasts: Toast[] = [
            { id: 'an id', type: ToastTypeEnum.NEUTRAL, message: 'a message' },
            { id: 'another id', type: ToastTypeEnum.SUCCESS, message: 'a message' },
        ];
        jest.mocked(useToasts).mockReturnValue({ toasts } as ToastContextProps);

        const wrapper = shallow(<ToastsContainer position="bottom-right" />);

        expect(getByTestId(wrapper, 'toasts').children().length).toEqual(2);
        expect(getByTestId(wrapper, 'toast-0').prop('id')).toEqual('an id');
        expect(getByTestId(wrapper, 'toast-1').prop('id')).toEqual('another id');
    });
});
