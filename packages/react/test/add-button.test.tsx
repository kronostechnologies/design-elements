import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { AddButton } from '../src/components/buttons/add-button';

describe('Add Button', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <AddButton onClick={callback} buttonType="primary">
                Primary
            </AddButton>,
        );
        wrapper.find(AddButton).simulate('click');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('onClick callback cannot be called when disabled', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <AddButton onClick={callback} buttonType="primary" disabled>
                Disabled
            </AddButton>,
        );
        wrapper.find(AddButton).simulate('click');
        expect(callback).toHaveBeenCalledTimes(0);
    });

    test('Button is disabled', () => {
        const tree = renderer.create(
            <AddButton buttonType="primary" onClick={() => {}} disabled>
                Primary Button
            </AddButton>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Button has primary styles', () => {
        const tree = renderer.create(
            <AddButton buttonType="primary" onClick={() => {}}>
                Primary Button
            </AddButton>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Button has secondary styles', () => {
        const tree = renderer.create(
            <AddButton buttonType="secondary" onClick={() => {}}>
                Primary Button
            </AddButton>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });

    test('Button has tertiary styles', () => {
        const tree = renderer.create(
            <AddButton buttonType="tertiary" onClick={() => {}}>
                Primary Button
            </AddButton>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
