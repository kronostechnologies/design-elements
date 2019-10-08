import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { RadioButton } from '../src/components/forms/inputs/radio-button';

const Buttons = [
    { label: 'Earth', value: 'earth' },
    { label: 'Mars', value: 'mars', defaultChecked: true },
    { label: 'Pluto', value: 'pluto', disabled: true },
    { label: 'Saturn', value: 'saturn' },
];

describe('Radio button', () => {
    test('onChange callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <RadioButton label="Planets" groupName="planets" buttons={Buttons} onChange={callback} />,
        );
        wrapper.find('input').at(0).simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <RadioButton label="Planets" groupName="planets" buttons={Buttons}/>,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
