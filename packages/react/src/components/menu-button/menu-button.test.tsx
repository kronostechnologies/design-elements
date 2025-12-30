import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { MenuItem } from '../menu';
import { MenuButton } from './menu-button';

describe('MenuButton', () => {
    let options: MenuItem[];

    beforeEach(() => {
        options = [
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
    });

    it('should return Button component by default', () => {
        renderWithProviders(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

        expect(screen.getByRole('button', { name: /test/i })).toBeInTheDocument();
        expect(screen.getByTestId('chevron-icon')).toBeInTheDocument();
    });

    it('should return IconButton component when iconName prop is defined', () => {
        renderWithProviders(<MenuButton iconName="home" buttonType="primary" options={options}>Test</MenuButton>);

        expect(screen.getByRole('button')).toBeInTheDocument();
        expect(screen.queryByText('Test')).not.toBeInTheDocument();
        expect(screen.queryByTestId('chevron-icon')).not.toBeInTheDocument();
    });

    it('should open menu when menu-button is clicked', async () => {
        renderWithProviders(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

        await userEvent.click(screen.getByRole('button', { name: /test/i }));

        expect(screen.getByTestId('menu')).toBeInTheDocument();
    });

    it('should open menu when Space key is pressed', async () => {
        renderWithProviders(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

        const button = screen.getByRole('button', { name: /test/i });
        button.focus();
        await userEvent.keyboard(' ');

        expect(screen.getByTestId('menu')).toBeInTheDocument();
    });

    it('should open menu when Enter key is pressed', async () => {
        renderWithProviders(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

        const button = screen.getByRole('button', { name: /test/i });
        button.focus();
        await userEvent.keyboard('{Enter}');

        expect(screen.getByTestId('menu')).toBeInTheDocument();
    });

    it('should select menu child #0 if Enter is pressed', async () => {
        renderWithProviders(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

        const button = screen.getByRole('button', { name: /test/i });
        button.focus();
        await userEvent.keyboard('{Enter}');

        await waitFor(() => expect(screen.getByTestId('menu-option-0')).toHaveFocus());
    });

    it('should be default open when defaultOpen prop is set to true', () => {
        renderWithProviders(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        expect(screen.getByTestId('menu')).toBeInTheDocument();
    });

    it('should close menu when escape key is pressed inside menu', async () => {
        renderWithProviders(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        const firstOption = screen.getByTestId('menu-option-0');
        firstOption.focus();
        await userEvent.keyboard('{Escape}');

        expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
    });

    it('should focus menu-button when escape key is pressed inside menu', async () => {
        renderWithProviders(
            <MenuButton buttonType="primary" defaultOpen options={options}>Test</MenuButton>,
        );

        const firstOption = screen.getByTestId('menu-option-0');
        firstOption.focus();
        await userEvent.keyboard('{Escape}');

        await waitFor(() => expect(screen.getByRole('button', { name: /test/i })).toHaveFocus());
    });

    it('should close menu when tab key is pressed inside menu', async () => {
        renderWithProviders(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        const firstOption = screen.getByTestId('menu-option-0');
        firstOption.focus();
        await userEvent.keyboard('{Tab}');

        expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
    });

    it('should close menu when an option is selected inside menu', async () => {
        renderWithProviders(
            <MenuButton buttonType="primary" defaultOpen options={options}>
                Test
            </MenuButton>,
        );

        await userEvent.click(screen.getByTestId('menu-option-0'));

        expect(screen.queryByTestId('menu')).not.toBeInTheDocument();
    });

    describe('chevron icon', () => {
        it('should point downwards when menu is not open', () => {
            renderWithProviders(<MenuButton buttonType="primary" options={options}>Test</MenuButton>);

            const button = screen.getByRole('button', { name: /test/i });
            expect(button).toHaveAttribute('aria-expanded', 'false');
        });

        it('should point upwards when menu is open', () => {
            renderWithProviders(
                <MenuButton
                    buttonType="primary"
                    defaultOpen
                    options={options}
                >
                    Test
                </MenuButton>,
            );

            const button = screen.getByRole('button', { name: /test/i });
            expect(button).toHaveAttribute('aria-expanded', 'true');
        });
    });

    it('should render a tooltip when the tooltip prop is provided', async () => {
        const tooltipProps = { label: 'Tooltip text', placement: 'top' as const };
        renderWithProviders(
            <MenuButton buttonType="primary" options={options} tooltip={tooltipProps}>
                Test
            </MenuButton>,
        );

        const button = screen.getByRole('button', { name: /test/i });
        await userEvent.hover(button);

        expect(await screen.findByText('Tooltip text')).toBeInTheDocument();
    });
});
