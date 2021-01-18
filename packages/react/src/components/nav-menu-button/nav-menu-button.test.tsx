import React, { ReactElement } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithTheme, renderWithTheme, shallowWithTheme } from '../../test-utils/renderer';
import { NavMenuButton } from './nav-menu-button';

jest.mock('../../utils/uuid');

function setup(children: ReactElement): ReactElement {
    return (
        <Router>
            {children}
        </Router>
    );
}

const options = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

describe('NavMenuButton', () => {
    test('nav-menu is open when defaultOpen prop is set to true', () => {
        const wrapper = shallowWithTheme(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        );

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(false);
    });

    test('Opens nav-menu when menu-button is clicked', () => {
        const wrapper = shallowWithTheme(
            <NavMenuButton options={options}>
                Test Button
            </NavMenuButton>,
        );

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(false);
    });

    test('Focuses the first menu-item when menu opens', () => {
        const wrapper = mountWithTheme(setup(
            <NavMenuButton options={options}>
                Test Button
            </NavMenuButton>,
        ));

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-navMenu').prop('focusedValue')).toBe('optionA');
    });

    test('Should close nav-menu when escape key is pressed in nav-menu', () => {
        const wrapper = mountWithTheme(setup(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        ));

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(true);
    });

    test('Focuses menu-button when escape key is pressed in nav-menu', () => {
        const wrapper = mountWithTheme(
            setup(
                <NavMenuButton defaultOpen options={options}>
                    Test Button
                </NavMenuButton>,
            ),
            { attachTo: document.body },
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
    });

    test('Matches Snapshot', () => {
        const tree = renderWithTheme(setup(
            <NavMenuButton options={options}>
                Test Button
            </NavMenuButton>,
        ));

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithTheme(setup(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        ));

        expect(tree).toMatchSnapshot();
    });
});
