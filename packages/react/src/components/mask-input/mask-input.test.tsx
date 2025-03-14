import { fireEvent } from '@testing-library/react';
import { act } from 'react-dom/test-utils';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderPortalWithProviders } from '../../test-utils/renderer';
import { MaskInput } from './mask-input';

describe('MaskInput', () => {
    test('should have controllable data-testid', () => {
        const customDataTestId = 'some-data-test-id';
        const wrapper = mountWithProviders(
            <MaskInput
                data-testid={customDataTestId}
                mask='(___) ___-____'
                defaultValue='(123) 456-7890'
            />,
        );

        expect(getByTestId(wrapper, customDataTestId).exists()).toEqual(true);
    });

    test('should display the defaultValue', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='(123) 456-7890' />);

        const phoneInput = getByTestId(wrapper, 'mask-text-input');

        expect(phoneInput.prop('value')).toEqual('(123) 456-7890');
    });

    test('should trimmed defaultValue chars that exceed input max length', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='(123) 456-7890 123' />);

        const phoneInput = getByTestId(wrapper, 'mask-text-input');

        expect(phoneInput.prop('value')).toEqual('(123) 456-7890');
    });

    test('should format and display the first tab panel by default', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='1234567890' />);

        const phoneInput = getByTestId(wrapper, 'mask-text-input');

        expect(phoneInput.prop('value')).toEqual('(123) 456-7890');
    });

    test('should format value on change', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' />);
        const maskInput = wrapper.find('input');

        maskInput.simulate('change', { target: { value: '(1__) ___-____', selectionStart: 1 } });

        expect(wrapper.find('input').prop('value')).toEqual('(1__) ___-____');
    });

    test('should format new inserted value when mask input is already complete but trim last character', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='(123) 345-6789' />);

        wrapper.find('input').simulate('change', {
            target: { value: '(123) 045-6789', selectionStart: 6 },
        });

        expect(wrapper.find('input').prop('value')).toEqual('(123) 045-6789');
    });

    test('should remove previous digit following mask char removal when removing char with backspace', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='(123) 456-7890' />);
        const maskInput = wrapper.find('input');

        act(() => {
            maskInput.props().onKeyDown?.({
                key: 'Backspace',
                preventDefault: jest.fn(),
                currentTarget: { selectionStart: 7, selectionEnd: 7 },
            } as unknown as React.KeyboardEvent<HTMLInputElement>);
        });

        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('(123) _56-7890');
    });

    test('should remove next digit following mask char removal when removing char with delete', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='(123) 456-7890' />);
        const maskInput = wrapper.find('input');

        act(() => {
            maskInput.props().onKeyDown?.({
                key: 'Delete',
                preventDefault: jest.fn(),
                currentTarget: { selectionStart: 7, selectionEnd: 7 },
            } as unknown as React.KeyboardEvent<HTMLInputElement>);
        });

        wrapper.update();

        expect(wrapper.find('input').prop('value')).toEqual('(123) 4_6-7890');
    });

    test('should not delete mask char when removing a mask char at the beginning of the input', () => {
        const wrapper = mountWithProviders(<MaskInput mask='(___) ___-____' defaultValue='(123) 456-7890' />);
        const maskInput = wrapper.find('input');

        act(() => {
            maskInput.props().onKeyDown?.({
                key: 'Backspace',
                preventDefault: jest.fn(),
                currentTarget: { selectionStart: 1, selectionEnd: 1 },
            } as unknown as React.KeyboardEvent<HTMLInputElement>);
        });

        expect(wrapper.find('input').prop('value')).toEqual('(123) 456-7890');
    });

    test('should not show validation message when input is empty and required onBlur', () => {
        const { getByTestId: byTestId, queryByTestId } = renderPortalWithProviders(
            <form>
                <MaskInput
                    mask='(___) ___-____'
                    label='test'
                    required
                    validationErrorMessage='This field is required'
                />
                <button data-testid="submit-button" type="submit">Submit</button>
            </form>,
        );

        fireEvent.blur(byTestId('mask-text-input'), { target: { value: '' } });
        expect(queryByTestId('invalid-field')).toBeNull();

        fireEvent.click(byTestId('submit-button'));
        expect(byTestId('invalid-field')).not.toBeNull();
    });
});
