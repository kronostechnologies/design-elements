import { ReactWrapper } from 'enzyme';
import React from 'react';
import ReactDOM from 'react-dom';
import { Menu } from './menu';
import { mountWithTheme } from '../../test-utils/renderer';
import { getByTestId } from '../../test-utils/enzyme-selectors';

const options = [
    {
        label: 'Mango',
        onClick: jest.fn(),
    },
    {
        label: 'Pineapple',
        onClick: jest.fn(),
    },
    {
        label: 'Lime',
        onClick: jest.fn(),
    },
];

const optionsWithSubMenu = [
    {
        label: 'Mango',
        onClick: jest.fn(),
        options,
    },
    {
        label: 'Pineapple',
        onClick: jest.fn(),
    },
    {
        label: 'Lime',
        onClick: jest.fn(),
    },
];

function expectFocusToBeOn(element: ReactWrapper): void {
    expect(document.activeElement).toBe(element.getDOMNode());
}

describe('Menu', () => {
    it('should call onClick callback when option is clicked', () => {
        const wrapper = mountWithTheme(<Menu options={options} />);

        getByTestId(wrapper, 'menu-option-0').simulate('click');

        expect(options[0].onClick).toHaveBeenCalledTimes(1);
    });

    it('should call onKeyDown callback when a key is pressed inside menu', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Menu options={options} onKeyDown={callback} />);

        getByTestId(wrapper, 'menu').simulate('keydown');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call onOptionSelect callback when an option is selected', () => {
        const callback = jest.fn();
        const wrapper = mountWithTheme(<Menu options={options} onOptionSelect={callback} />);

        getByTestId(wrapper, 'menu-option-0').simulate('click');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should open subMenu when option is clicked given option as subMenu', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} />);

        getByTestId(wrapper, 'menu-option-0').simulate('click');

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(true);
    });

    it('should open subMenu when ArrowRight key is pressed given option as subMenu', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} initialFocusIndex={0} />);

        getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowRight' });

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(true);
    });

    it('should open subMenu when mouse enters given option as subMenu', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} />);

        getByTestId(wrapper, 'menu-option-0').simulate('mouseEnter');

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(true);
    });

    it('should collapse subMenu when mouse leaves given option as subMenu', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} />);

        getByTestId(wrapper, 'menu-option-0').simulate('mouseEnter');
        getByTestId(wrapper, 'menu-option-0').simulate('mouseLeave');

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(false);
    });

    it('subMenu should stay open when mouse enters', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} />);

        getByTestId(wrapper, 'menu-option-0').simulate('mouseEnter');
        getByTestId(wrapper, 'menu-option-0-sub-menu').simulate('mouseEnter');

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(true);
    });

    it('subMenu should close when mouse leaves', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} />);

        getByTestId(wrapper, 'menu-option-0').simulate('mouseEnter');
        getByTestId(wrapper, 'menu-option-0-sub-menu').simulate('mouseLeave');

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(false);
    });

    it('should collapse subMenu when ArrowLeft key is pressed inside subMenu', () => {
        const wrapper = mountWithTheme(<Menu options={optionsWithSubMenu} initialFocusIndex={0} />);

        getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowRight' });
        getByTestId(wrapper, 'menu-option-0-sub-menu').simulate('keydown', { key: 'ArrowLeft' });

        expect(getByTestId(wrapper, 'menu-option-0-sub-menu').exists()).toBe(false);
    });

    describe('focus', () => {
        const divElement = document.createElement('div');

        beforeAll(() => {
            document.body.appendChild(divElement);
        });

        afterEach(() => {
            ReactDOM.unmountComponentAtNode(divElement);
        });

        it('should be on the first option when initialFocus is set to 0', () => {
            const wrapper = mountWithTheme(
                <div id="root">
                    <Menu options={options} initialFocusIndex={0} />
                </div>,
                { attachTo: divElement },
            );

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-0'));
        });

        it('should be on the next option when ArrowDown key is pressed', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowDown' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-1'));
        });

        it('should be on the first option when ArrowDown key is pressed on last option', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={options.length - 1} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowDown' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-0'));
        });

        it('should be on the previous option when ArrowUp key is pressed', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={1} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowUp' });

            expectFocusToBeOn(getByTestId(wrapper, `menu-option-${0}`));
        });

        it('should be on the last option when ArrowUp key is pressed on first option', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowUp' });

            expectFocusToBeOn(getByTestId(wrapper, `menu-option-${options.length - 1}`));
        });

        it('should be on the first option starting with typed character', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'l' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-2'));
        });

        it('should be on the first element of subMenu when ArrowRight key is pressed given option as subMenu', () => {
            const wrapper = mountWithTheme(
                <Menu options={optionsWithSubMenu} initialFocusIndex={0} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowRight' });

            expectFocusToBeOn(getByTestId(wrapper, 'sub-menu-option-0'));
        });

        it('should be on the subMenu parent option when ArrowLeft key is pressed inside subMenu', () => {
            const wrapper = mountWithTheme(
                <Menu options={optionsWithSubMenu} initialFocusIndex={0} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowRight' });
            getByTestId(wrapper, 'menu-option-0-sub-menu').simulate('keydown', { key: 'ArrowLeft' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-0'));
        });

        it('should stay inside the menu when the subMenu is open by hovering with the mouse', () => {
            const wrapper = mountWithTheme(
                <Menu options={optionsWithSubMenu} initialFocusIndex={0} />,
                { attachTo: divElement },
            );

            getByTestId(wrapper, 'menu-option-0').simulate('mouseEnter');

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-0'));
        });
    });
});
