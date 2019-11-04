import React from 'react';

import { mount } from 'enzyme';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../theme-wrapper/theme-wrapper.test';
import { CheckboxGroup } from './checkbox-group';

const checkboxGroup = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    { label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true },
    { label: 'Car', name: 'vehicule3', value: 'car', disabled: true },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

describe('Checkbox', () => {

    test('onChange callback is called when checkbox is checked / unchecked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(
                <CheckboxGroup
                    checkboxGroup={checkboxGroup}
                    onChange={callback}
                />,
            ),
        );
        wrapper.find('input').at(0).simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Can be used as a controlled value', () => {
        const wrapper = mount(
            ThemeWrapped(
                <CheckboxGroup
                    checkboxGroup={[{ label: 'Boat', name: 'vehicule1', value: 'boat' }]}
                    checkedValues={['boat']}
                    onChange={() => {}}
                />,
            ),
        );
        const input = wrapper.find('input').at(0);
        expect(input.prop('checked')).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<CheckboxGroup label="Vehicule" checkboxGroup={checkboxGroup} />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
