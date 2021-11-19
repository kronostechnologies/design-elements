import React from 'react';
import { PasswordCreationInput } from './password-creation-input';
import { mountWithProviders } from '../../test-utils/renderer';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { Translations } from '../../i18n/translations';
import { shallow } from 'enzyme';

describe('PasswordCreationInput', () => {
    const onChange = jest.fn();

    test('sets password type to password when not showing password', () => {
        const wrapper = shallow(
            <PasswordCreationInput onChange={onChange} />,
        );

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('password');
    });

    test('calls onChange with password and isValid to false when a custom validation is false', () => {
        const wrapper = mountWithProviders(
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

        getByTestId(wrapper, 'password-input').prop('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(expect.objectContaining(event), false);
    });

    test('calls onChange with password and isValid to true when a custom validation is true', () => {
        const wrapper = mountWithProviders(
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

        getByTestId(wrapper, 'password-input').prop('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(expect.objectContaining(event), true);
    });

    test('calls onChange with password and isValid to true when password changes to a valid password', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );
        const password = 'Pe2345678910';
        const event = { target: { name: 'password', value: password } };

        getByTestId(wrapper, 'password-input').prop('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(expect.objectContaining(event), true);
    });

    test('calls onChange with password and isValid to false when password changes to an invalid password', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );
        const password = 'Pe23';
        const event = { target: { name: 'password', value: password } };

        getByTestId(wrapper, 'password-input').prop('onChange')(event);

        expect(onChange).toHaveBeenCalledWith(expect.objectContaining(event), false);
    });

    test('sets password type to text when show password button is clicked', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'show-password-button').simulate('click');

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('text');
    });

    test('sets password strength to weak when there is only 8 characters', () => {
        const expectedLabel = Translations.en['password-creation-input']['password-is'] + (
            Translations.en['password-creation-input'].weak);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').prop('onChange')({ target: { value: '12345678' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });

    test('sets password strength to fair when there is at least 8 characters and at least one uppercase', () => {
        const expectedLabel = Translations.en['password-creation-input']['password-is'] + (
            Translations.en['password-creation-input'].fair);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').prop('onChange')({ target: { value: 'P2345678' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });

    test('sets password strength to good when there is at least 8 characters and at least one uppercase', () => {
        const expectedLabel = Translations.en['password-creation-input']['password-is'] + (
            Translations.en['password-creation-input'].good);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').prop('onChange')({ target: { value: 'Pe234567' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });

    test('sets password strength to strong when there is at least 8 characters and at least one uppercase', () => {
        const expectedLabel = Translations.en['password-creation-input']['password-is'] + (
            Translations.en['password-creation-input'].strong);
        const wrapper = mountWithProviders(
            <PasswordCreationInput onChange={onChange} />,
        );

        getByTestId(wrapper, 'password-input').prop('onChange')({ target: { value: 'Pe2345678910' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe(expectedLabel);
    });
});
