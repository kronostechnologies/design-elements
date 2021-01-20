import React from 'react';
import { doNothing } from '../../test-utils/callbacks';
import { mountWithTheme, renderWithTheme } from '../../test-utils/renderer';
import { CheckboxGroup } from './checkbox-group';

const checkboxGroup = [
    { label: 'Boat', name: 'vehicule1', value: 'boat' },
    {
        label: 'Plane', name: 'vehicule2', value: 'plane', defaultChecked: true,
    },
    {
        label: 'Car', name: 'vehicule3', value: 'car', disabled: true,
    },
    { label: 'Bike', name: 'vehicule4', value: 'bike' },
];

describe('Checkbox', () => {
    test('onChange callback is called when checkbox is checked / unchecked', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(
            <CheckboxGroup
                checkboxGroup={checkboxGroup}
                onChange={callback}
            />,
        );
        wrapper.find('input').at(0).simulate('change');
        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Can be used as a controlled value', () => {
        const wrapper = mountWithTheme(
            <CheckboxGroup
                checkboxGroup={[{ label: 'Boat', name: 'vehicule1', value: 'boat' }]}
                checkedValues={['boat']}
                onChange={doNothing}
            />,
        );
        const input = wrapper.find('input').at(0);
        expect(input.prop('checked')).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <CheckboxGroup label="Vehicule" checkboxGroup={checkboxGroup} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
