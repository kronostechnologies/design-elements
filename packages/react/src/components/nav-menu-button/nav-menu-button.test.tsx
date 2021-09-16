import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import {
    mountWithProviders,
    renderWithProviders,
    shallowWithTheme,
} from '../../test-utils/renderer';
import { NavMenuButton } from './nav-menu-button';

jest.mock('../../utils/uuid');

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
        const wrapper = mountWithProviders(
            <NavMenuButton options={options}>
                Test Button
            </NavMenuButton>,
        );

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-navMenu').prop('focusedValue')).toBe('optionA');
    });

    test('Should close nav-menu when escape key is pressed in nav-menu', () => {
        const wrapper = mountWithProviders(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(true);
    });

    test('Focuses menu-button when escape key is pressed in nav-menu', () => {
        const wrapper = mountWithProviders(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
    });

    test('Should call onMenuVisibilityChanged when nav-menu closes', () => {
        const onMenuVisibilityChanged = jest.fn();
        const wrapper = mountWithProviders(
            <NavMenuButton defaultOpen options={options} onMenuVisibilityChanged={onMenuVisibilityChanged}>
                Test Button
            </NavMenuButton>,
        );

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(onMenuVisibilityChanged).toHaveBeenCalledWith(false);
    });

    test('Should call onMenuVisibilityChanged when nav-menu opens', () => {
        const onMenuVisibilityChanged = jest.fn();
        const wrapper = mountWithProviders(
            <NavMenuButton options={options} onMenuVisibilityChanged={onMenuVisibilityChanged}>
                Test Button
            </NavMenuButton>,
        );

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(onMenuVisibilityChanged).toHaveBeenCalledWith(true);
    });

    test('Should call onMenuOptionsSelected when an option is selected in the nav-menu', () => {
        const onMenuOptionSelected = jest.fn();
        const wrapper = mountWithProviders(
            <NavMenuButton options={options} onMenuOptionSelected={onMenuOptionSelected}>
                Test Button
            </NavMenuButton>,
        );

        const navMenuOption = getByTestId(wrapper, `listitem-${options[0].value}`);
        navMenuOption.simulate('click');

        expect(onMenuOptionSelected).toHaveBeenCalledWith(options[0]);
    });

    test('Matches Snapshot', () => {
        const tree = renderWithProviders(
            <NavMenuButton options={options}>
                Test Button
            </NavMenuButton>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithProviders(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        );

        expect(tree).toMatchSnapshot();
    });
});
