import React from 'react';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { RadioButtonGroup } from './radio-button-group';

const Buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

describe('Radio button', () => {
    test('onChange callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <RadioButtonGroup label="Planets" groupName="planets" buttons={Buttons} onChange={callback} />,
        );
        wrapper.find('input').at(0).simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Can be used as a controlled input', () => {
        const wrapper = mount(
            <RadioButtonGroup
                groupName="color"
                checkedValue="red"
                buttons={[{ label: 'Red', value: 'red' }]}
                onChange={() => {}}
            />,
        );
        const input = wrapper.find('input[type="radio"]').at(0);
        expect(input.prop('checked')).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <RadioButtonGroup label="Planets" groupName="planets" buttons={Buttons} />,
        ).toJSON();
        expect(tree).toMatchSnapshot();
    });
});
