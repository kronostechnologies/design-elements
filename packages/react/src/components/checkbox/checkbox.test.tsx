import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { Checkbox } from './checkbox';

const Checkboxes = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    { label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true },
    { label: 'Car', name: 'vehicule3', value: 'car', disabled: true },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

describe('Checkbox', () => {

    test('onChange callback is called when checkbox is checked / unchecked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            <Checkbox
                label=""
                checkboxes={[{ label: 'Plane', name: 'vehicule', value: 'plane', defaultChecked: true }]}
                onChange={callback}
            />,
        );
        wrapper.find('input').simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            <Checkbox label="Vehicule" checkboxes={Checkboxes} />,
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
