import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ToggleButtonGroup } from './toggle-button-group';

const buttonGroup = [
    {
        value: 'option1',
        label: 'Option 1',
        disabled: true,
    },
    {
        value: 'option2',
        label: 'Option 2',
        defaultChecked: true,
    },
    {
        value: 'option3',
        label: 'Option 3',
    },
    {
        value: 'option4',
        label: 'Option 4',
    },
];

describe('ToggleButtonGroup', () => {
    test('onChange callback is called when changed', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<ToggleButtonGroup onChange={callback} buttonGroup={buttonGroup} groupName="Test1" />),
        );

        wrapper.find('input').at(2).simulate('change');
        expect(callback).toHaveBeenCalled();
    });

    test('Is default checked', () => {
        const wrapper = mount(
            ThemeWrapped(<ToggleButtonGroup buttonGroup={buttonGroup} groupName="Test2" />),
        );

        expect(wrapper.find('input').at(1).prop('checked')).toBe(true);
    });

    test('Is disabled', () => {
        const wrapper = mount(
            ThemeWrapped(<ToggleButtonGroup buttonGroup={buttonGroup} groupName="Test3" />),
        );

        expect(wrapper.find('input').at(0).prop('disabled')).toBe(true);
    });

    test('Matches snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<ToggleButtonGroup buttonGroup={buttonGroup} groupName="Test4" />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
