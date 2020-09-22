import { mountWithProviders, renderWithProviders } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Button } from './button';

describe('Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<Button onClick={callback} buttonType="primary" label="Primary Button" />);

        wrapper.find(Button).simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<Button onClick={callback} buttonType="primary" disabled label="Primary Button" />);

        wrapper.find(Button).simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Is disabled', () => {
        const tree = renderWithProviders(
            <Button onClick={() => {}} buttonType="primary" disabled label="Primary Button" />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has primary styles', () => {
        const tree = renderWithProviders(
            <Button onClick={() => {}} buttonType="primary" label="Primary Button" />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderWithProviders(
            <Button onClick={() => {}} buttonType="secondary" label="Secondary Button" />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const tree = renderWithProviders(
            <Button onClick={() => {}} buttonType="tertiary" label="Tertiary Button" />,
            'desktop',
        );

        expect(tree).toMatchSnapshot();
    });
});
