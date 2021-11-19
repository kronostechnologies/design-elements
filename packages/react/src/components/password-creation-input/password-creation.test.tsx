import React from 'react';
import { PasswordCreationInput } from './password-creation-input';
import {
    mountWithProviders,
} from '../../test-utils/renderer';
import { getByTestId } from '../../test-utils/enzyme-selectors';

describe('PasswordCreationInput', () => {
    test('sets password type to password when not showing password', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput />,
        );

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('password');
    });

    test('sets password type to text when show password button is clicked', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput />,
        );
        getByTestId(wrapper, 'show-password-button').simulate('click');

        expect(getByTestId(wrapper, 'password-input').prop('type')).toBe('text');
    });

    test('sets password strength to weak when there is at least 8 characters', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput />,
        );

        getByTestId(wrapper, 'password-input').simulate('change', { target: { value: '12345678' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe('The password is: Weak');
    });

    test('sets password strength to fair when there is at least 8 characters and at least one uppercase', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput />,
        );

        getByTestId(wrapper, 'password-input').simulate('change', { target: { value: 'P234567' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe('The pasword is: Fair');
    });

    test('sets password strength to good when there is at least 8 characters and at least one uppercase', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput />,
        );

        getByTestId(wrapper, 'password-input').simulate('change', { target: { value: 'Pe234567' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe('The password is: Good');
    });

    test('sets password strength to strong when there is at least 8 characters and at least one uppercase', () => {
        const wrapper = mountWithProviders(
            <PasswordCreationInput />,
        );

        getByTestId(wrapper, 'password-input').simulate('change', { target: { value: 'Pe2345678910' } });

        expect(getByTestId(wrapper, 'password-strength').text()).toBe('The password is: Strong');
    });
});
