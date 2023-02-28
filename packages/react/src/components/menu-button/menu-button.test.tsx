import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { waitForComponentToPaint } from '../../test-utils/enzyme-utils';
import { mountWithTheme } from '../../test-utils/renderer';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { MenuOption } from '../menu/menu';
import { MenuButton } from './menu-button';

function givenOptions(): MenuOption[] {
    return [
        {
            label: 'Option 1',
            onClick: jest.fn(),
        },
        {
            label: 'Option 2',
            onClick: jest.fn(),
        },
        {
            label: 'Option 3',
            onClick: jest.fn(),
        },
    ];
}

describe('MenuButton', () => {
    let options: MenuOption[];

    beforeEach(() => {
        options = givenOptions();
    });

    it('should return Button component by default', () => {
        const wrapper = shallow(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

        expect(getByTestId(wrapper, 'menu-button').type()).toBe(Button);
    });

    it('should return IconButton component when iconName prop is defined', () => {
        const wrapper = shallow(<MenuButton iconName="home" buttonType="primary" options={options}>Test</MenuButton>);

        expect(getByTestId(wrapper, 'menu-button').type()).toBe(IconButton);
    });

    it('should open menu when menu-button is clicked', () => {
        const wrapper = mountWithTheme(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);
        waitForComponentToPaint(wrapper);

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu').exists()).toBe(true);
    });

    it('should be default open when defaultOpen prop is set to true', () => {
        const wrapper = mountWithTheme(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        expect(getByTestId(wrapper, 'menu').exists()).toBe(true);
    });

    it('should close menu when escape key is pressed inside menu', () => {
        const wrapper = mountWithTheme(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        getByTestId(wrapper, 'menu').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu').exists()).toBe(false);
    });

    it('should focus menu-button when escape key is pressed inside menu', () => {
        const wrapper = mountWithTheme(
            <MenuButton buttonType="primary" defaultOpen options={options}>Test</MenuButton>,
            { attachTo: document.body },
        );

        getByTestId(wrapper, 'menu').simulate('keydown', { key: 'Escape' });

        setTimeout(() => {
            expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
        }, 0);
        wrapper.detach();
    });

    it('should close menu when tab key is pressed inside menu', () => {
        const wrapper = mountWithTheme(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        getByTestId(wrapper, 'menu').simulate('keydown', { key: 'Tab' });

        expect(getByTestId(wrapper, 'menu').exists()).toBe(false);
    });

    it('should close menu when an option is selected inside menu', () => {
        const wrapper = mountWithTheme(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        getByTestId(wrapper, 'menu-option-0').simulate('click');

        expect(getByTestId(wrapper, 'menu').exists()).toBe(false);
    });

    describe('chevron icon', () => {
        it('should point downwards when menu is not open', () => {
            const wrapper = mountWithTheme(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

            expect(getByTestId(wrapper, 'chevron-icon').prop('name')).toBe('chevronDown');
        });

        it('should point upwards when menu is open', () => {
            const wrapper = mountWithTheme(
                <MenuButton
                    buttonType="primary"
                    defaultOpen
                    options={options}
                >
                    Test
                </MenuButton>,
            );

            expect(getByTestId(wrapper, 'chevron-icon').prop('name')).toBe('chevronUp');
        });
    });
});
