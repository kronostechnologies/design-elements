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

    test('has disabled styles', () => {
        const tree = renderWithProviders(
            <Button onClick={() => {}} buttonType="primary" disabled label="Primary Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has primary styles', () => {
        const tree = renderWithProviders(<Button onClick={() => {}} buttonType="primary" label="Primary Button" />);

        expect(tree).toMatchSnapshot();
    });

    test('has secondary styles', () => {
        const tree = renderWithProviders(<Button onClick={() => {}} buttonType="secondary" label="Secondary Button" />);

        expect(tree).toMatchSnapshot();
    });

    test('has tertiary styles', () => {
        const tree = renderWithProviders(<Button onClick={() => {}} buttonType="tertiary" label="Tertiary Button" />);

        expect(tree).toMatchSnapshot();
    });

    test('has mobile styles', () => {
        const tree = renderWithProviders(
            <Button onClick={() => {}} buttonType="primary" label="Primary Button" />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
