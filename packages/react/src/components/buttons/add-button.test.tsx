import React from 'react';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { AddButton } from './add-button';

describe('Add Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <AddButton onClick={callback} buttonType="primary" label="Primary Button" />,
        );

        wrapper.find(AddButton).simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(
            <AddButton onClick={callback} buttonType="primary" disabled label="Disabled" />,
        );

        wrapper.find(AddButton).simulate('click');

        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('has disabled styles', () => {
        const tree = renderWithProviders(
            <AddButton
                buttonType="primary"
                onClick={jest.fn()}
                disabled
                label="Primary Button"
            />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has primary styles', () => {
        const tree = renderWithProviders(<AddButton buttonType="primary" onClick={jest.fn()} label="Primary Button" />);

        expect(tree).toMatchSnapshot();
    });

    test('has secondary styles', () => {
        const tree = renderWithProviders(
            <AddButton buttonType="secondary" onClick={jest.fn()} label="Secondary Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has tertiary styles', () => {
        const tree = renderWithProviders(
            <AddButton buttonType="tertiary" onClick={jest.fn()} label="Tertiary Button" />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('has mobile styles', () => {
        const tree = renderWithProviders(
            <AddButton buttonType="primary" onClick={jest.fn()} label="Primary Button" />,
            'mobile',
        );

        expect(tree).toMatchSnapshot();
    });
});
