import React from 'react';
import { mocked } from 'ts-jest/utils';
import { useToasts } from '../../hooks/use-toasts';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme } from '../../test-utils/renderer';
import { ToastContainer } from './toast-container';
import { ToastContextProps } from './toast-context';
import { ToastTypeEnum } from './toast-type';

jest.mock('../../hooks/use-toasts');

describe('ToastContainer', () => {
    it('should remove toast when dismiss is clicked', () => {
        const removeToast: (id: string) => void = jest.fn();
        mocked(useToasts).mockReturnValue({ removeToast } as ToastContextProps);
        const wrapper = mountWithTheme(
            <ToastContainer id="an id" type="success" message="a message" position="bottom-right" />,
        );

        getByTestId(wrapper, 'dismiss').simulate('click');

        expect(removeToast).toHaveBeenCalled();
    });

    Object.values(ToastTypeEnum).map((type) => (
        it(`should match snapshot (${type})`, () => {
            mocked(useToasts).mockReturnValue({} as ToastContextProps);

            const wrapper = mountWithTheme(
                <ToastContainer id="an id" type={type} message="a message" position="bottom-right" />,
            );

            expect(wrapper).toMatchSnapshot();
        })
    ));
});
