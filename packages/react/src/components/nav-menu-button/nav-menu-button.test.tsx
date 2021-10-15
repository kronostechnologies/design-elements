import { shallow } from 'enzyme';
import React from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import {
    mountWithProviders,
    renderWithProviders,
} from '../../test-utils/renderer';
import { NavMenuButton } from './nav-menu-button';
import { IconButton } from '../buttons/icon-button';

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

const buttonTypes = ['normal', 'iconOnly'] as const;

describe('NavMenuButton', () => {
    buttonTypes.forEach((type) => {
        const isIconOnly = type === 'iconOnly';

        test(`Opens nav-menu when menu-button is clicked (${type})`, () => {
            const wrapper = shallow(
                <NavMenuButton options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </NavMenuButton>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(false);
        });

        test(`Focuses the first menu-item when menu opens (${type})`, () => {
            const wrapper = mountWithProviders(
                <NavMenuButton options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </NavMenuButton>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(getByTestId(wrapper, 'menu-navMenu').prop('focusedValue')).toBe('optionA');
        });

        test(`Focuses menu-button when escape key is pressed in nav-menu (${type})`, () => {
            const wrapper = mountWithProviders(
                <NavMenuButton defaultOpen options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </NavMenuButton>,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

            expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
            wrapper.unmount();
        });

        test(`Should call onMenuVisibilityChanged when nav-menu closes (${type})`, () => {
            const onMenuVisibilityChanged = jest.fn();
            const wrapper = mountWithProviders(
                <NavMenuButton
                    defaultOpen
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onMenuVisibilityChanged={onMenuVisibilityChanged}
                >
                    Test Button
                </NavMenuButton>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(onMenuVisibilityChanged).toHaveBeenCalledWith(false);
        });

        test(`Should call onMenuVisibilityChanged when nav-menu opens (${type})`, () => {
            const onMenuVisibilityChanged = jest.fn();
            const wrapper = mountWithProviders(
                <NavMenuButton
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onMenuVisibilityChanged={onMenuVisibilityChanged}
                >
                    Test Button
                </NavMenuButton>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(onMenuVisibilityChanged).toHaveBeenCalledWith(true);
        });
    });

    test('Should use IconButton component when iconOnly is true', () => {
        const wrapper = shallow(
            <NavMenuButton options={options} iconOnly iconName="home">
                Test Button
            </NavMenuButton>,
        );

        expect(wrapper.find(IconButton).exists()).toBe(true);
    });

    test('nav-menu is open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(
            <NavMenuButton defaultOpen options={options}>
                Test Button
            </NavMenuButton>,
        );

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(false);
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

    test('Should call onMenuOptionsSelected when an option is selected in the nav-menu', () => {
        const onMenuOptionSelected = jest.fn();
        const wrapper = mountWithProviders(
            <NavMenuButton options={options} onMenuOptionSelected={onMenuOptionSelected}>
                Test Button
            </NavMenuButton>,
        );

        const navMenuOption = getByTestId(wrapper, `listitem-${options[0].value}`);
        navMenuOption.simulate('click');

        expect(onMenuOptionSelected).toHaveBeenCalledWith(expect.objectContaining(options[0]));
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
