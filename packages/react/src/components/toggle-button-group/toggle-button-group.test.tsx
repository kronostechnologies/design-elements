import { mount } from 'enzyme';
import React from 'react';
import renderer from 'react-test-renderer';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { ThemeWrapped } from '../../test-utils/theme-wrapped';
import { ToggleButtonGroup } from './toggle-button-group';

const buttonGroup = [
    { label: 'Option 1', value: 'option1', disabled: true },
    { label: 'Option 2', value: 'option2', defaultPressed: true },
    { label: 'Option 3', value: 'option3' },
    { label: 'Option 4', value: 'option4' },
];

describe('ToggleButtonGroup', () => {
    test('onClick callback is called when clicked', () => {
        const callback = jest.fn();
        const wrapper = mount(
            ThemeWrapped(<ToggleButtonGroup onClick={callback} buttonGroup={buttonGroup} groupName="Test1" />),
        );

        getByTestId(wrapper, 'test-toggle-button-2').simulate('click');
        expect(callback).toHaveBeenCalled();
    });

    test('Is default pressed', () => {
        const wrapper = mount(
            ThemeWrapped(<ToggleButtonGroup buttonGroup={buttonGroup} groupName="Test2" />),
        );

        expect(getByTestId(wrapper, 'test-toggle-button-1').prop('pressed')).toBe(true);
    });

    test('Is disabled', () => {
        const wrapper = mount(
            ThemeWrapped(<ToggleButtonGroup buttonGroup={buttonGroup} groupName="Test3" />),
        );

        expect(getByTestId(wrapper, 'test-toggle-button-0').prop('disabled')).toBe(true);
    });

    test('Matches snapshot', () => {
        const tree = renderer.create(
            ThemeWrapped(<ToggleButtonGroup buttonGroup={buttonGroup} groupName="Test4" />),
        ).toJSON();

        expect(tree).toMatchSnapshot();
    });
});
