import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { IconButton } from '../buttons/icon-button';
import { DropdownNavigation } from './dropdown-navigation';

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

describe('DropdownNavigation', () => {
    buttonTypes.forEach((type) => {
        const isIconOnly = type === 'iconOnly';

        test(`Adds aria-label to menu-button when buttonAriaLabel is defined (${type})`, () => {
            const ariaLabel = 'test-aria-label';

            const wrapper = shallow(
                <DropdownNavigation buttonAriaLabel={ariaLabel} options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            expect(getByTestId(wrapper, 'menu-button').prop('aria-label')).toBe(ariaLabel);
        });

        test(`Opens nav-menu when menu-button is clicked (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(false);
        });

        test(`Focuses the first menu-item when menu opens with Enter (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'menu-button').simulate('keydown', { key: 'Enter' });

            setTimeout(() => {
                expect(getByTestId(wrapper, 'menu-navMenu').prop('focusedValue')).toBe('optionA');
            });
        });

        test(`Focuses the first menu-item when menu opens with Space (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'menu-button').simulate('keydown', { key: ' ' });

            setTimeout(() => {
                expect(getByTestId(wrapper, 'menu-navMenu').prop('focusedValue')).toBe('optionA');
            });
        });

        test(`Focuses menu-button when escape key is pressed in nav-menu (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation defaultOpen options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'listitem-optionA-link').simulate('keydown', { key: 'Escape' });

            expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
            wrapper.unmount();
        });

        test(`Should call onMenuVisibilityChanged when nav-menu closes (${type})`, () => {
            const onMenuVisibilityChanged = jest.fn();
            const wrapper = mountWithProviders(
                <DropdownNavigation
                    defaultOpen
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onMenuVisibilityChanged={onMenuVisibilityChanged}
                >
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(onMenuVisibilityChanged).toHaveBeenCalledWith(false);
        });

        test(`Should call onMenuVisibilityChanged when nav-menu opens (${type})`, () => {
            const onMenuVisibilityChanged = jest.fn();
            const wrapper = mountWithProviders(
                <DropdownNavigation
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onMenuVisibilityChanged={onMenuVisibilityChanged}
                >
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'menu-button').simulate('click');

            expect(onMenuVisibilityChanged).toHaveBeenCalledWith(true);
        });
    });

    test('Should use IconButton component when iconOnly is true', () => {
        const wrapper = shallow(
            <DropdownNavigation options={options} iconOnly iconName="home">
                Test Button
            </DropdownNavigation>,
        );

        expect(wrapper.find(IconButton).exists()).toBe(true);
    });

    test('nav-menu is open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(false);
    });

    test('Should close nav-menu when escape key is pressed in nav-menu', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        getByTestId(wrapper, 'listitem-optionA-link').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu-navMenu').prop('hidden')).toBe(true);
    });

    test('Should call onMenuOptionsSelected when an option is selected in the nav-menu', () => {
        const onMenuOptionSelected = jest.fn();
        const wrapper = mountWithProviders(
            <DropdownNavigation options={options} onMenuOptionSelected={onMenuOptionSelected}>
                Test Button
            </DropdownNavigation>,
        );

        const navMenuOption = getByTestId(wrapper, `listitem-${options[0].value}-link`);
        navMenuOption.simulate('click');

        expect(onMenuOptionSelected).toHaveBeenCalledWith(expect.objectContaining(options[0]));
    });

    test('Matches Snapshot', () => {
        const tree = renderWithProviders(
            <DropdownNavigation options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Renders div container tag when "tag" prop is set to div', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation tag="div" options={options}>Test Button</DropdownNavigation>,
        );

        const navMenuContainer = getByTestId(wrapper, 'navmenu-container');
        expect(navMenuContainer.prop('as')).toEqual('div');
    });

    test('Renders nav container tag when "tag" props is set to nav', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation tag="nav" options={options}>Test Button</DropdownNavigation>,
        );

        const navMenuContainer = getByTestId(wrapper, 'navmenu-container');
        expect(navMenuContainer.prop('as')).toEqual('nav');
    });

    test('Matches Snapshot (tag="nav")', () => {
        const tree = renderWithProviders(
            <DropdownNavigation tag="nav" options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(tree).toMatchSnapshot();
    });
});
