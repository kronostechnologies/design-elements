import { getByTestId } from '@design-elements/test-utils/enzyme-selectors';
import { mountWithProviders, renderWithTheme, shallowWithTheme } from '@design-elements/test-utils/renderer';
import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { NavMenu } from './nav-menu';

jest.mock('uuid/v4');

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

describe('NavMenu', () => {
    test('Calls onChange callback when an option is clicked', () => {
        const callback = jest.fn();
        const wrapper = shallowWithTheme(<NavMenu options={options} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Calls onChange callback when enter key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = shallowWithTheme(<NavMenu options={options} onChange={callback} />);

        getByTestId(wrapper, 'listitem-optionC').simulate('keydown', {
            key: 'Enter',
            preventDefault: jest.fn(),
            currentTarget: { click: jest.fn() },
        });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Calls onKeyDown callback when a key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = shallowWithTheme(<NavMenu options={options} onKeyDown={callback} />);

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: '' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    test('Should update focused value when focusedValue prop changes', () => {
        const wrapper = mountWithProviders(
            <NavMenu options={options} />,
            { attachTo: document.body },
        );

        wrapper.setProps({ focusedValue: 'optionB' }).update();

        expect(document.activeElement).toBe(getByTestId(wrapper, 'listitem-optionB').getDOMNode());
    });

    test('Matches the snapshot', () => {
        const tree = renderWithTheme(
            <Router>
                <NavMenu options={options} />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Is hidden', () => {
        const tree = renderWithTheme(
            <Router>
                <NavMenu options={options} hidden />
            </Router>,
        );

        expect(tree).toMatchSnapshot();
    });
});
