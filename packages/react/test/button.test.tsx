import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../src/components/buttons/button';

describe('Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <Button onClick={callback} buttonType="primary" label="Primary Button" />,
        );
        wrapper.find(Button).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <Button onClick={callback} buttonType="primary" disabled label="Primary Button" />,
        );
        wrapper.find(Button).simulate('click');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Is disabled', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="primary" disabled label="Primary Button" />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has primary styles', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="primary" label="Primary Button" />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="secondary" label="Secondary Button" />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="tertiary" label="Tertiary Button" />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
