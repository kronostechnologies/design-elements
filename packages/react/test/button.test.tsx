import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Button } from '../src/components/buttons/button';

describe('Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <Button onClick={callback} buttonType="primary">
                Primary
            </Button>,
        );
        wrapper.find(Button).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <Button onClick={callback} buttonType="primary" disabled>
                Primary
            </Button>,
        );
        wrapper.find(Button).simulate('click');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Is disabled', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="primary" disabled>
                Secondary
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has primary styles', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="primary">
                Secondary
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has secondary styles', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="secondary">
                Secondary
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Has tertiary styles', () => {
        const tree = renderer.create(
            <Button onClick={() => {}} buttonType="tertiary">
                Secondary
            </Button>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
