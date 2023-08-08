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

        test(`Adds aria-label to navigation-button when buttonAriaLabel is defined (${type})`, () => {
            const ariaLabel = 'test-aria-label';

            const wrapper = shallow(
                <DropdownNavigation buttonAriaLabel={ariaLabel} options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            expect(getByTestId(wrapper, 'navigation-button').prop('aria-label')).toBe(ariaLabel);
        });

        test(`Opens navigation-dropdown when navigation-button is clicked (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'navigation-button').simulate('click');

            expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('hidden')).toBe(false);
        });

        test(`Focuses the first navigation-item when navigation opens with Enter (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'navigation-button').simulate('keydown', { key: 'Enter' });

            setTimeout(() => {
                expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('focusedValue')).toBe('optionA');
            });
        });

        test(`Focuses the first navigation-item when dropdown opens with Space (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'navigation-button').simulate('keydown', { key: ' ' });

            setTimeout(() => {
                expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('focusedValue')).toBe('optionA');
            });
        });

        test(`Focuses navigation-button when escape key is pressed in navigation-dropdown (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation defaultOpen options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
                { attachTo: document.body },
            );

            getByTestId(wrapper, 'listitem-optionA-link').simulate('keydown', { key: 'Escape' });

            expect(document.activeElement).toBe(getByTestId(wrapper, 'navigation-button').getDOMNode());
            wrapper.unmount();
        });

        test(`Should call onDropdownVisibilityChanged when navigation-dropdown closes (${type})`, () => {
            const onDropdownVisibilityChanged = jest.fn();
            const wrapper = mountWithProviders(
                <DropdownNavigation
                    defaultOpen
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onDropdownVisibilityChanged={onDropdownVisibilityChanged}
                >
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'navigation-button').simulate('click');

            expect(onDropdownVisibilityChanged).toHaveBeenCalledWith(false);
        });

        test(`Should call onDropdownVisibilityChanged when navigation-dropdown opens (${type})`, () => {
            const onDropdownVisibilityChanged = jest.fn();
            const wrapper = mountWithProviders(
                <DropdownNavigation
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onDropdownVisibilityChanged={onDropdownVisibilityChanged}
                >
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'navigation-button').simulate('click');

            expect(onDropdownVisibilityChanged).toHaveBeenCalledWith(true);
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

    test('navigation-dropdown is open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('hidden')).toBe(false);
    });

    test('Should close navigation-dropdown when escape key is pressed in navigation-dropdown', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        getByTestId(wrapper, 'listitem-optionA-link').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('hidden')).toBe(true);
    });

    test('Should call onLinkSelected when an option is selected in the navigation-dropdown', () => {
        const onLinkSelected = jest.fn();
        const wrapper = mountWithProviders(
            <DropdownNavigation options={options} onLinkSelected={onLinkSelected}>
                Test Button
            </DropdownNavigation>,
        );

        const navLink = getByTestId(wrapper, `listitem-${options[0].value}-link`);
        navLink.simulate('click');

        expect(onLinkSelected).toHaveBeenCalledWith(expect.objectContaining(options[0]));
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

        const dropdownNavContainer = getByTestId(wrapper, 'dropdownnav-container');
        expect(dropdownNavContainer.prop('as')).toEqual('div');
    });

    test('Renders nav container tag when "tag" props is set to nav', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation tag="nav" options={options}>Test Button</DropdownNavigation>,
        );

        const dropdownNavContainer = getByTestId(wrapper, 'dropdownnav-container');
        expect(dropdownNavContainer.prop('as')).toEqual('nav');
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
