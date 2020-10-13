import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from '@design-elements/test-utils/renderer';
import { NavMenu, NavMenuProps } from './nav-menu';

jest.mock('uuid/v4');

describe('Listbox', () => {
    test('Calls onChange callback when an option is selected', () => {
        const callback = jest.fn();
        const wrapper = shallowWithTheme(<NavMenu options={options} onChange={callback}/>);

        getByTestId(wrapper, 'listitem-optionC').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Calls onKeyDown callback when a key is pressed', () => {
        const callback = jest.fn();
        const wrapper = shallowWithTheme(<NavMenu options={options} onKeyDown={callback}/>);

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: '' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Focus value changes to previous option when arrowUp key is pressed', () => {
        const wrapper = mountWithTheme(setup({ options, focusedValue: 'optionB' }));

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: 'ArrowUp' });

        expect(getByTestId(wrapper, 'listitem-optionA').props().$focused).toBe(true);
    });

    test('Focus value changes to last option when arrowUp key is pressed given first option is focused', () => {
        const wrapper = mountWithTheme(setup({ options, focusedValue: 'optionA' }));

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: 'ArrowUp' });

        expect(getByTestId(wrapper, 'listitem-optionD').props().$focused).toBe(true);
    });

    test('Focus value changes to next option when arrowDown key is pressed', () => {
        const wrapper = mountWithTheme(setup({ options, focusedValue: 'optionB' }));

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: 'ArrowDown' });

        expect(getByTestId(wrapper, 'listitem-optionC').props().$focused).toBe(true);
    });

    test('Focus value changes to first option when arrowDown key is pressed given last option is focused', () => {
        const wrapper = mountWithTheme(setup({ options, focusedValue: 'optionD' }));

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: 'ArrowDown' });

        expect(getByTestId(wrapper, 'listitem-optionA').props().$focused).toBe(true);
    });

    test('Selects focused value when enter key is pressed', () => {
        const wrapper = mountWithTheme(setup({ options, focusedValue: 'optionA' }));

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: 'Enter' });

        expect(getByTestId(wrapper, 'listitem-optionA').props().$selected).toBe(true);
    });

    test('Calls onFocusedValueChange callback when focused option changes', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(setup({ options, focusedValue: 'optionB', onFocusedValueChange: callback }));

        getByTestId(wrapper, 'menu-list').simulate('keydown', { key: 'ArrowUp' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Should update value given value prop changed', () => {
        const wrapper = mountWithTheme(setup({ options }));

        wrapper.setProps({ value: 'optionB' }).update();

        expect(getByTestId(wrapper, 'listitem-optionB').props().$selected).toBe(true);
    });

    test('Should not update value given value prop is undefined', () => {
        const wrapper = mountWithTheme(setup({ options, value: 'optionA' }));

        wrapper.setProps({ value: undefined }).update();

        expect(getByTestId(wrapper, 'listitem-optionA').props().$selected).toBe(true);
    });

    test('Should update focused value given focusedValue prop changed', () => {
        const wrapper = mountWithTheme(setup({ options }));

        wrapper.setProps({ focusedValue: 'optionB' }).update();

        expect(getByTestId(wrapper, 'listitem-optionB').props().$focused).toBe(true);
    });

    test('Should focus menu-list when autofocus prop is set to true', () => {
        const wrapper = mountWithTheme(setup({ options, autofocus: true }), { attachTo: document.body });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-list').getDOMNode());
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(setup({ options }));

        expect(tree).toMatchSnapshot();
    });

    test('Is hidden', () => {
        const tree = renderWithTheme(setup({ options, hidden: true }));

        expect(tree).toMatchSnapshot();
    });
});

const options = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testA',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testB',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testC',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testD',
    },
];

const setup = (properties: NavMenuProps): ReactElement => {
    return React.createElement(
        props => (
          <Router>
            <NavMenu {...props} />
          </Router>
        ),
        properties);
};
