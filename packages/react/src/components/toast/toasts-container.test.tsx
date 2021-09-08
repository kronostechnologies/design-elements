import { shallow } from 'enzyme';
import React from 'react';
import { mocked } from 'ts-jest/utils';
import { useToasts } from '../../hooks/use-toasts';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { Toast, ToastContextProps } from './toast-context';
import { ToastTypeEnum } from './toast-type';
import { ToastsContainer } from './toasts-container';

jest.mock('../../hooks/use-toasts');

describe('ToastsContainer', () => {
    it('should display toasts in order', () => {
        const toasts: Toast[] = [
            { id: 'an id', type: ToastTypeEnum.INFORMATION, message: 'a message' },
            { id: 'another id', type: ToastTypeEnum.SUCCESS, message: 'a message' },
        ];
        mocked(useToasts).mockReturnValue({ toasts } as ToastContextProps);

        const wrapper = shallow(<ToastsContainer position="bottom-right" />);

        expect(getByTestId(wrapper, 'toasts').children().length).toEqual(2);
        expect(getByTestId(wrapper, 'toast-0').prop('id')).toEqual('an id');
        expect(getByTestId(wrapper, 'toast-1').prop('id')).toEqual('another id');
    });
});
