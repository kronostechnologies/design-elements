import { shallow } from 'enzyme';
import { PhoneInput } from '~/components/phone-input/phone-input';
import { findByTestId, getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

describe('PhoneInput', () => {
    it('should have controllable data-testid', () => {
        const customDataTestId = 'some-data-test-id';
        const wrapper = mountWithProviders(
            <PhoneInput
                data-testid={customDataTestId}
                pattern="(___) ___-____"
                defaultValue="(123) 456-7890"
            />,
        );

        expect(getByTestId(wrapper, customDataTestId).exists()).toBe(true);
    });

    it('should display the defaultValue', () => {
        const wrapper = mountWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        const phoneInput = getByTestId(wrapper, 'phone-text-input');

        expect(phoneInput.prop('value')).toBe('(123) 456-7890');
    });

    it('should trimmed defaultValue chars that exceed input max length', () => {
        const wrapper = mountWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890 123" />);

        const phoneInput = getByTestId(wrapper, 'phone-text-input');

        expect(phoneInput.prop('value')).toBe('(123) 456-7890');
    });

    it('should format and display the first tab panel by default', () => {
        const wrapper = mountWithProviders(<PhoneInput pattern="(___) ___-____" defaultValue="1234567890" />);

        const phoneInput = getByTestId(wrapper, 'phone-text-input');

        expect(phoneInput.prop('value')).toBe('(123) 456-7890');
    });

    it('should format value on change', () => {
        const wrapper = shallow(<PhoneInput pattern="(___) ___-____" />);

        findByTestId(wrapper, 'phone-text-input').simulate('change', { currentTarget: { value: '123' } });

        const phoneInput = getByTestId(wrapper, 'phone-text-input');
        expect(phoneInput.prop('value')).toBe('(123) ');
    });

    it('should format new inserted value when phone input is already complete but trim last character', () => {
        const wrapper = shallow(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        findByTestId(wrapper, 'phone-text-input').simulate('change', {
            currentTarget: { value: '(123) 0456-7890', selectionStart: 7 },
        });

        const phoneInput = getByTestId(wrapper, 'phone-text-input');
        expect(phoneInput.prop('value')).toBe('(123) 045-6789');
    });

    it('should remove previous digit following mask char removal when removing char with backspace', () => {
        const wrapper = shallow(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        findByTestId(wrapper, 'phone-text-input').simulate('keydown', { key: 'Backspace' });
        findByTestId(wrapper, 'phone-text-input').simulate('change', {
            currentTarget: { value: '(123)456-7890', selectionStart: 5 },
        });

        const phoneInput = getByTestId(wrapper, 'phone-text-input');
        expect(phoneInput.prop('value')).toBe('(124) 567-890');
    });

    it('should remove next digit following mask char removal when removing char with delete', () => {
        const wrapper = shallow(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        findByTestId(wrapper, 'phone-text-input').simulate('keydown', { key: 'Delete' });
        findByTestId(wrapper, 'phone-text-input').simulate('change', {
            currentTarget: { value: '(123 456-7890', selectionStart: 4 },
        });

        const phoneInput = getByTestId(wrapper, 'phone-text-input');
        expect(phoneInput.prop('value')).toBe('(123) 567-890');
    });

    it('should reinsert mask char when removing a mask char at the beginning of the input', () => {
        const wrapper = shallow(<PhoneInput pattern="(___) ___-____" defaultValue="(123) 456-7890" />);

        findByTestId(wrapper, 'phone-text-input').simulate('keydown', { key: 'Backspace' });
        findByTestId(wrapper, 'phone-text-input').simulate('change', {
            currentTarget: { value: '123) 456-7890', selectionStart: 0 },
        });

        const phoneInput = getByTestId(wrapper, 'phone-text-input');
        expect(phoneInput.prop('value')).toBe('(123) 456-7890');
    });
});
