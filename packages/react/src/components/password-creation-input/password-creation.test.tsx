import { shallow } from 'enzyme';
import { PasswordCreationInput } from './password-creation-input';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';
import { Translations } from '../../i18n/translations';
import { getPasswordStrength } from './password-strength';
import { PasswordStrengthEnum } from './password-strength.enum';

jest.mock('./password-strength', () => ({
    getPasswordStrength: jest.fn(),
}));

describe('PasswordCreationInput', () => {
    test('has controllable data-test-id', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput data-testid="a-password-input" onChange={onChange} />,
        );

        expect(getByTestId(wrapper, 'a-password-input').prop('type')).toBe('password');
    });

    test('sets password type to password when not showing password', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput onChange={onChange} />,
        );

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('password');
    });

    test('calls onChange with password and isValid to false when a custom validation is false', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput
                validations={[
                    {
                        label: 'contains numbers',
                        isValid: (password) => /\d/.test(password),
                    },
                ]}
                onChange={onChange}
            />,
        );
        const password = 'abc';
        const event = { target: { name: 'password', value: password } };

        getByTestId(wrapper, 'password-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(password, false, expect.objectContaining(event));
    });

    test('calls onChange with password and isValid to true when a custom validation is true', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput
                validations={[
                    {
                        label: 'contains numbers',
                        isValid: (password) => /\d/.test(password),
                    },
                ]}
                onChange={onChange}
            />,
        );
        const password = '123';
        const event = { target: { name: 'password', value: password } };

        getByTestId(wrapper, 'password-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(password, true, expect.objectContaining(event));
    });

    test('calls onChange with password and isValid to true when password changes to a valid password', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput onChange={onChange} />,
        );
        const password = 'Pe2345678910';
        const event = { target: { name: 'password', value: password } };

        getByTestId(wrapper, 'password-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(password, true, expect.objectContaining(event));
    });

    test('calls onChange with password and isValid to false when password changes to an invalid password', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput onChange={onChange} />,
        );
        const password = 'Pe23';
        const event = { target: { name: 'password', value: password } };

        getByTestId(wrapper, 'password-input').invoke('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(password, false, expect.objectContaining(event));
    });

    test('sets password type to text when show password button is clicked', () => {
        const onChange = jest.fn();
        const wrapper = shallow(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'show-password-button').simulate('click');

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('text');
    });

    test('sets password strength text to weak when strength is weak', () => {
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.WEAK);
        const expectedLabel = Translations.en['password-creation-input']['password-strength'] + (
            Translations.en['password-creation-input'].weak);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').invoke('onChange')({ target: { value: '12345678' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });

    test('sets password strength text to fair when strength is fair', () => {
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.FAIR);
        const expectedLabel = Translations.en['password-creation-input']['password-strength'] + (
            Translations.en['password-creation-input'].fair);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').invoke('onChange')({ target: { value: 'P2345678' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });

    test('sets password strength text to good when strength is good', () => {
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.GOOD);
        const expectedLabel = Translations.en['password-creation-input']['password-strength'] + (
            Translations.en['password-creation-input'].good);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').invoke('onChange')({ target: { value: 'Pe234567' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });

    test('sets password strength to strong when strength is strong', () => {
        const onChange = jest.fn();
        jest.mocked(getPasswordStrength).mockReturnValue(PasswordStrengthEnum.STRONG);
        const expectedLabel = Translations.en['password-creation-input']['password-strength'] + (
            Translations.en['password-creation-input'].strong);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').invoke('onChange')({ target: { value: 'Pe2345678910' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });
});
