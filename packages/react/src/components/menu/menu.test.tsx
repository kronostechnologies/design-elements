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

function expectFocusToBeOn(element: ReactWrapper): void {
    expect(document.activeElement).toBe(element.getDOMNode());
}

describe('Menu', () => {
    beforeAll(() => {
        window.HTMLElement.prototype.scrollIntoView = jest.fn();
    });

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

    describe('focus', () => {
        afterEach(() => {
            ReactDOM.unmountComponentAtNode(document.body);
        });

        it('should be on first option when initialFocus is set to 0', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: document.body },
            );

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-0'));
        });

        it('should go to next option when ArrowDown key is pressed', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowDown' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-1'));
        });

        it('should go to the first option when ArrowDown key is pressed on last option', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={options.length - 1} />,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowDown' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-0'));
        });

        it('should go to the previous option when ArrowUp key is pressed', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={1} />,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowUp' });

            expectFocusToBeOn(getByTestId(wrapper, `menu-option-${0}`));
        });

        it('should go to the last option when ArrowUp key is pressed on first option', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'ArrowUp' });

            expectFocusToBeOn(getByTestId(wrapper, `menu-option-${options.length - 1}`));
        });

        it('should focus the first option starting with typed character', () => {
            const wrapper = mountWithTheme(
                <Menu options={options} initialFocusIndex={0} />,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'menu').simulate('keydown', { key: 'l' });

            expectFocusToBeOn(getByTestId(wrapper, 'menu-option-2'));
        });
    });
});
