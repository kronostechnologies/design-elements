import { shallow } from 'enzyme';
import { IconButton } from '~/components/buttons/icon-button';
import { DropdownNavigation } from '~/components/dropdown-navigation/dropdown-navigation';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

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

        it(`Adds aria-label to navigation-button when buttonAriaLabel is defined (${type})`, () => {
            const ariaLabel = 'test-aria-label';

            const wrapper = shallow(
                <DropdownNavigation buttonAriaLabel={ariaLabel} options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            expect(getByTestId(wrapper, 'navigation-button').prop('aria-label')).toBe(ariaLabel);
        });

        it(`Opens navigation-dropdown when navigation-button is clicked (${type})`, () => {
            const wrapper = mountWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            getByTestId(wrapper, 'navigation-button').simulate('click');

            expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('hidden')).toBe(false);
        });

        it(`Focuses the first navigation-item when navigation opens with Enter (${type})`, () => {
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

        it(`Focuses the first navigation-item when dropdown opens with Space (${type})`, () => {
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

        it(`Focuses navigation-button when escape key is pressed in navigation-dropdown (${type})`, () => {
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

        it(`Should call onDropdownVisibilityChanged when navigation-dropdown closes (${type})`, () => {
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

        it(`Should call onDropdownVisibilityChanged when navigation-dropdown opens (${type})`, () => {
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

    it('Should use IconButton component when iconOnly is true', () => {
        const wrapper = shallow(
            <DropdownNavigation options={options} iconOnly iconName="home">
                Test Button
            </DropdownNavigation>,
        );

        expect(wrapper.find(IconButton).exists()).toBe(true);
    });

    it('navigation-dropdown is open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('hidden')).toBe(false);
    });

    it('Should close navigation-dropdown when escape key is pressed in navigation-dropdown', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        getByTestId(wrapper, 'listitem-optionA-link').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'dropdown-navDropdown').prop('hidden')).toBe(true);
    });

    it('Should call onLinkSelected when an option is selected in the navigation-dropdown', () => {
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

    it('Renders div container tag when "tag" prop is set to div', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation tag="div" options={options}>Test Button</DropdownNavigation>,
        );

        const dropdownNavContainer = getByTestId(wrapper, 'nav-container');
        expect(dropdownNavContainer.prop('as')).toEqual('div');
    });

    it('Renders nav container tag when "tag" props is set to nav', () => {
        const wrapper = mountWithProviders(
            <DropdownNavigation tag="nav" options={options}>Test Button</DropdownNavigation>,
        );

        const dropdownNavContainer = getByTestId(wrapper, 'nav-container');
        expect(dropdownNavContainer.prop('as')).toEqual('nav');
    });
});
