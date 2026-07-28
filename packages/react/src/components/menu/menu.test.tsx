import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { Menu, MenuOption } from './menu';

jest.mock('../../utils/uuid', () => ({
    v4: () => '00000000-0000-0000-0000-000000000000',
}));

function givenOptions(): MenuOption[] {
    return [
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
}

function givenOptionsWithSubMenu(subMenuForFirstOption: MenuOption[]): MenuOption[] {
    return [
        {
            label: 'Mango',
            onClick: jest.fn(),
            options: subMenuForFirstOption,
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
}

describe('Menu', () => {
    let options: MenuOption[];
    let optionsWithSubMenu: MenuOption[];

    beforeEach(() => {
        options = givenOptions();
        optionsWithSubMenu = givenOptionsWithSubMenu(options);
    });

    it('should call onClick callback when option is clicked', async () => {
        renderWithProviders(<Menu options={options} />);

        await userEvent.click(screen.getByTestId('menu-option-0'));

        expect(options[0].onClick).toHaveBeenCalledTimes(1);
    });

    it('should call onKeyDown callback when a key is pressed inside menu', async () => {
        const callback = jest.fn();
        renderWithProviders(<Menu options={options} onKeyDown={callback} />);

        await userEvent.keyboard('{Enter}');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should call onOptionSelect callback when an option is selected', async () => {
        const callback = jest.fn();
        renderWithProviders(<Menu options={options} onOptionSelect={callback} />);

        await userEvent.click(screen.getByTestId('menu-option-0'));

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('should open subMenu when option is clicked given option as subMenu', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.click(screen.getByTestId('menu-option-0'));

        expect(screen.getByTestId('menu-option-0-sub-menu')).toBeInTheDocument();
    });

    it('should open subMenu when ArrowRight key is pressed given option as subMenu', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.keyboard('{ArrowRight}');

        expect(screen.getByTestId('menu-option-0-sub-menu')).toBeInTheDocument();
    });

    it('should open subMenu when mouse enters given option as subMenu', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.hover(screen.getByTestId('menu-option-0'));

        expect(screen.getByTestId('menu-option-0-sub-menu')).toBeInTheDocument();
    });

    it('should collapse subMenu when mouse leaves given option as subMenu', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.hover(screen.getByTestId('menu-option-0'));
        await userEvent.unhover(screen.getByTestId('menu-option-0'));

        expect(screen.queryByTestId('menu-option-0-sub-menu')).not.toBeInTheDocument();
    });

    it('subMenu should stay open when mouse enters', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.hover(screen.getByTestId('menu-option-0'));
        await userEvent.hover(screen.getByTestId('menu-option-0-sub-menu'));

        expect(screen.getByTestId('menu-option-0-sub-menu')).toBeInTheDocument();
    });

    it('subMenu should close when mouse leaves', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.hover(screen.getByTestId('menu-option-0'));
        await userEvent.unhover(screen.getByTestId('menu-option-0-sub-menu'));

        expect(screen.queryByTestId('menu-option-0-sub-menu')).not.toBeInTheDocument();
    });

    it('should collapse subMenu when ArrowLeft key is pressed inside subMenu', async () => {
        renderWithProviders(<Menu options={optionsWithSubMenu} />);

        await userEvent.keyboard('{ArrowRight}');
        await userEvent.keyboard('{ArrowLeft}');

        expect(screen.queryByTestId('menu-option-0-sub-menu')).not.toBeInTheDocument();
    });

    describe('focus', () => {
        it('should be on the first option when initialFocus is set to 0', () => {
            renderWithProviders(<Menu options={options} />);

            expect(screen.getByTestId('menu-option-0')).toHaveFocus();
        });

        it('should be on the next option when ArrowDown key is pressed', async () => {
            renderWithProviders(<Menu options={options} />);

            await userEvent.keyboard('{ArrowDown}');

            expect(screen.getByTestId('menu-option-1')).toHaveFocus();
        });

        it('should be on the first option when ArrowDown key is pressed on last option', async () => {
            renderWithProviders(<Menu options={options} />);

            await userEvent.keyboard('{ArrowDown}'.repeat(options.length - 1));
            await userEvent.keyboard('{ArrowDown}');

            expect(screen.getByTestId('menu-option-0')).toHaveFocus();
        });

        it('should be on the previous option when ArrowUp key is pressed', async () => {
            renderWithProviders(<Menu options={options} />);

            await userEvent.keyboard('{ArrowDown}');
            await userEvent.keyboard('{ArrowDown}');

            await userEvent.keyboard('{ArrowUp}');

            expect(screen.getByTestId('menu-option-1')).toHaveFocus();
        });

        it('should be on the last option when ArrowUp key is pressed on first option', async () => {
            renderWithProviders(<Menu options={options} />);

            await userEvent.keyboard('{ArrowUp}');

            expect(screen.getByTestId(`menu-option-${options.length - 1}`)).toHaveFocus();
        });

        it('should be on the first option starting with typed character', async () => {
            renderWithProviders(<Menu options={options} />);

            await userEvent.keyboard('l');

            expect(screen.getByTestId('menu-option-2')).toHaveFocus();
        });

        it(
            'should be on the first element of subMenu when ArrowRight key is pressed given option as subMenu',
            async () => {
                renderWithProviders(<Menu options={optionsWithSubMenu} />);

                await userEvent.keyboard('{ArrowRight}');

                expect(screen.getByTestId('sub-menu-option-0')).toHaveFocus();
            },
        );

        it('should be on the subMenu parent option when ArrowLeft key is pressed inside subMenu', async () => {
            renderWithProviders(<Menu options={optionsWithSubMenu} />);

            await userEvent.keyboard('{ArrowRight}');
            await userEvent.keyboard('{ArrowLeft}');

            expect(screen.getByTestId('menu-option-0')).toHaveFocus();
        });

        it('should stay inside the menu when the subMenu is open by hovering with the mouse', async () => {
            renderWithProviders(<Menu options={optionsWithSubMenu} />);

            await userEvent.hover(screen.getByTestId('menu-option-0'));

            expect(screen.getByTestId('menu-option-0')).toHaveFocus();
        });
    });

    it('matches the snapshot (menu with icons)', () => {
        const { asFragment } = renderWithProviders(
            <Menu
                options={[
                    {
                        label: 'Option 1',
                        iconName: 'check',
                    },
                    {
                        label: 'Option 2',
                        iconName: 'settings',
                    },
                ]}
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });

    it('matches the snapshot (menu with groups)', () => {
        const { asFragment } = renderWithProviders(
            <Menu
                options={[
                    {
                        groupLabel: 'Group 1',
                        groupOptions: [
                            {
                                label: 'Option 1.1',
                            },
                            {
                                label: 'Option 1.2',
                            },
                        ],
                    },
                    {
                        groupLabel: 'Group 2',
                        groupOptions: [
                            {
                                label: 'Option 2.1',
                            },
                            {
                                label: 'Option 2.2',
                            },
                        ],
                    },
                ]}
            />,
        );

        expect(asFragment()).toMatchSnapshot();
    });
});
