import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { DropdownNavigation } from './dropdown-navigation';

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

describe('DropdownNavigation', () => {
    it('matches snapshot', async () => {
        const user = userEvent.setup();
        const { baseElement } = renderWithProviders(
            <DropdownNavigation options={options}>
                Test Button
            </DropdownNavigation>,
        );
        await user.click(screen.getByTestId('navigation-button'));

        expect(baseElement).toMatchSnapshot();
    });

    it('matches snapshot (tag="nav")', () => {
        const { container } = renderWithProviders(
            <DropdownNavigation tag="nav" options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('matches snapshot (defaultOpen)', () => {
        const { baseElement } = renderWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(baseElement).toMatchSnapshot();
    });

    (['normal', 'iconOnly'] as const).forEach((type) => {
        const isIconOnly = type === 'iconOnly';

        it(`adds aria-label to navigation-button when buttonAriaLabel is defined (${type})`, () => {
            const ariaLabel = 'test-aria-label';

            renderWithProviders(
                <DropdownNavigation buttonAriaLabel={ariaLabel} options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            expect(screen.getByTestId('navigation-button')).toHaveAttribute('aria-label', ariaLabel);
        });

        it(`opens navigation-dropdown when navigation-button is clicked (${type})`, async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            await user.click(screen.getByTestId('navigation-button'));

            expect(screen.getByTestId('dropdown-navDropdown')).toBeInTheDocument();
        });

        it(`focuses the first navigation-item when navigation opens with Enter (${type})`, async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            screen.getByTestId('navigation-button').focus();
            await user.keyboard('{Enter}');

            await waitFor(() => expect(screen.getByTestId(`listitem-${options[0].value}-link`)).toHaveFocus());
        });

        it(`focuses the first navigation-item when dropdown opens with Space (${type})`, async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownNavigation options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            screen.getByTestId('navigation-button').focus();
            await user.keyboard(' ');

            await waitFor(() => expect(screen.getByTestId(`listitem-${options[0].value}-link`)).toHaveFocus());
        });

        it(`focuses navigation-button when escape key is pressed in navigation-dropdown (${type})`, async () => {
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownNavigation defaultOpen options={options} iconOnly={isIconOnly} iconName="home">
                    Test Button
                </DropdownNavigation>,
            );

            screen.getByTestId(`listitem-${options[0].value}-link`).focus();
            await user.keyboard('{Escape}');

            expect(screen.getByTestId('navigation-button')).toHaveFocus();
        });

        it(`should call onDropdownVisibilityChanged when navigation-dropdown closes (${type})`, async () => {
            const onDropdownVisibilityChanged = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(
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

            await user.click(screen.getByTestId('navigation-button'));

            expect(onDropdownVisibilityChanged).toHaveBeenCalledWith(false);
        });

        it(`should call onDropdownVisibilityChanged when navigation-dropdown opens (${type})`, async () => {
            const onDropdownVisibilityChanged = jest.fn();
            const user = userEvent.setup();
            renderWithProviders(
                <DropdownNavigation
                    options={options}
                    iconOnly={isIconOnly}
                    iconName="home"
                    onDropdownVisibilityChanged={onDropdownVisibilityChanged}
                >
                    Test Button
                </DropdownNavigation>,
            );

            await user.click(screen.getByTestId('navigation-button'));

            expect(onDropdownVisibilityChanged).toHaveBeenCalledWith(true);
        });
    });

    it('navigation-dropdown is open when defaultOpen prop is set to true', () => {
        renderWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        expect(screen.getByTestId('dropdown-navDropdown')).toBeInTheDocument();
    });

    it('should close navigation-dropdown when escape key is pressed in navigation-dropdown', async () => {
        const user = userEvent.setup();
        renderWithProviders(
            <DropdownNavigation defaultOpen options={options}>
                Test Button
            </DropdownNavigation>,
        );

        screen.getByTestId(`listitem-${options[0].value}-link`).focus();
        await user.keyboard('{Escape}');

        expect(screen.queryByTestId('dropdown-navDropdown')).not.toBeInTheDocument();
    });

    it('should call onLinkSelected when an option is selected in the navigation-dropdown', async () => {
        const onLinkSelected = jest.fn();
        const user = userEvent.setup();
        renderWithProviders(
            <DropdownNavigation options={options} onLinkSelected={onLinkSelected}>
                Test Button
            </DropdownNavigation>,
        );

        await user.click(screen.getByTestId('navigation-button'));
        await user.click(screen.getByTestId(`listitem-${options[0].value}-link`));

        expect(onLinkSelected).toHaveBeenCalledWith(expect.objectContaining(options[0]));
    });

    it('renders div container tag when "tag" prop is set to div', () => {
        renderWithProviders(
            <DropdownNavigation tag="div" options={options}>Test Button</DropdownNavigation>,
        );

        const dropdownNavContainer = screen.getByTestId('nav-container');
        expect(dropdownNavContainer.tagName).toBe('DIV');
    });

    it('renders nav container tag when "tag" props is set to nav', () => {
        renderWithProviders(
            <DropdownNavigation tag="nav" options={options}>Test Button</DropdownNavigation>,
        );

        const dropdownNavContainer = screen.getByTestId('nav-container');
        expect(dropdownNavContainer.tagName).toBe('NAV');
    });
});
