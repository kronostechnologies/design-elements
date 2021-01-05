import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from '@design-elements/test-utils/renderer';
import React from 'react';
import { Listbox } from './listbox';

jest.mock('@design-elements/utils/uuid');

const options = [
    {
        label: 'Option A',
        value: 'optionA',
    },
    {
        label: 'Option B',
        value: 'optionB',
    },
    {
        label: 'Option C',
        value: 'optionC',
    },
    {
        label: 'Option D',
        value: 'optionD',
    },
];

describe('Listbox', () => {
    test('Correctly set the default option', () => {
        const wrapper = shallowWithTheme(<Listbox options={options} defaultValue="optionB" />);

        expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(true);
    });

    test('Correctly set the default option with array', () => {
        const wrapper = shallowWithTheme(<Listbox options={options} defaultValue={['optionB']} />);

        expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(true);
    });

    test('Correctly set the default option to the first array element given multiselect is set to false', () => {
        const wrapper = shallowWithTheme(
            <Listbox options={options} defaultValue={['optionA', 'optionB']} multiselect={false} />,
        );

        expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toEqual(true);
        expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(false);
    });

    test('Correctly set the default options given multiselect is set to true', () => {
        const wrapper = shallowWithTheme(
            <Listbox options={options} defaultValue={['optionA', 'optionB']} multiselect />,
        );

        expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toEqual(true);
        expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toEqual(true);
    });

    test('Calls onChange callback when an option is selected', () => {
        const callback = jest.fn();
        const wrapper = shallowWithTheme(<Listbox options={options} defaultValue="optionB" onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Options should not be selected when no defaultValue is provided', () => {
        const wrapper = shallowWithTheme(<Listbox options={options} />);

        expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(false);
        expect(getByTestId(wrapper, 'listitem-optionB').prop('selected')).toBe(false);
        expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(false);
        expect(getByTestId(wrapper, 'listitem-optionD').prop('selected')).toBe(false);
    });

    test('Should have the check indicator if selected', () => {
        const wrapper = shallowWithTheme(<Listbox options={options} checkIndicator />);

        expect(getByTestId(wrapper, 'listitem-optionC').find('[data-testid="check-icon"]')).toHaveLength(0);

        getByTestId(wrapper, 'listitem-optionC').simulate('click');

        expect(getByTestId(wrapper, 'listitem-optionC').find('[data-testid="check-icon"]')).toHaveLength(1);
    });

    test('Should allow multiple selections given multiselect is set to true', () => {
        const wrapper = shallowWithTheme(<Listbox options={options} defaultValue={['optionA']} multiselect />);

        getByTestId(wrapper, 'listitem-optionC').simulate('click');

        expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(true);
        expect(getByTestId(wrapper, 'listitem-optionC').prop('selected')).toBe(true);
    });

    test('Should unselect option given multiselect is set to true and option is selected', () => {
        const wrapper = shallowWithTheme(<Listbox options={options} defaultValue={['optionA']} multiselect />);

        getByTestId(wrapper, 'listitem-optionA').simulate('click');

        expect(getByTestId(wrapper, 'listitem-optionA').prop('selected')).toBe(false);
    });

    test('Should update value given value prop changed', () => {
        const wrapper = mountWithTheme(<Listbox options={options} value="optionA" />);

        wrapper.setProps({ value: 'optionB' }).update();

        expect(getByTestId(wrapper, 'listitem-optionA').props().selected).toBe(false);
        expect(getByTestId(wrapper, 'listitem-optionB').props().selected).toBe(true);
    });

    test('Should not update value given value prop is undefined', () => {
        const wrapper = mountWithTheme(<Listbox options={options} value="optionA" />);

        wrapper.setProps({ value: undefined }).update();

        expect(getByTestId(wrapper, 'listitem-optionA').props().selected).toBe(true);
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Listbox options={options} defaultValue="optionB" checkIndicator numberOfItemsVisible={3} />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot (multiselect + checkIndicator)', () => {
        const tree = renderWithTheme(
            <Listbox options={options} defaultValue={['optionA', 'optionC']} checkIndicator multiselect />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches the snapshot (dropdown)', () => {
        const tree = renderWithTheme(
            <Listbox options={options} defaultValue="optionB" checkIndicator numberOfItemsVisible={3} dropdown />,
        );

        expect(tree).toMatchSnapshot();
    });
});
