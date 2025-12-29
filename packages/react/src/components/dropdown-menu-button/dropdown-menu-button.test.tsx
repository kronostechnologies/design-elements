import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ReactElement } from 'react';
import { renderWithProviders } from '../../test-utils/renderer';
import { type GroupItemProps } from '../dropdown-menu';
import { ExternalItem, GroupItem, NavItem } from '../dropdown-menu/list-items';
import { DropdownMenuButton } from './dropdown-menu-button';

const TestGroups = (): ReactElement<GroupItemProps>[] | ReactElement<GroupItemProps> => (
    <>
        <GroupItem id="firstGroup">
            <NavItem value="optionA" href="/testA" />
            <NavItem value="optionB" href="/testB" />
            <NavItem value="optionC" href="/testC" />
            <NavItem value="optionD" disabled href="/testD" />
        </GroupItem>
        <GroupItem id="secondGroup">
            <ExternalItem label="ExternalA" href="https://external-link.com/a" />
            <ExternalItem label="ExternalB" href="https://external-link.com/b" />
            <ExternalItem label="ExternalC" href="https://external-link.com/c" />
            <ExternalItem label="ExternalD" disabled href="https://external-link.com/D" />
        </GroupItem>
    </>
);

describe('DropdownMenuButton', () => {
    it('matches Snapshot', async () => {
        const user = userEvent.setup();
        const { baseElement } = renderWithProviders(
            <DropdownMenuButton render={TestGroups} />,
        );
        const element = screen.getByTestId('menu-button');
        await user.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    it('matches Snapshot (defaultOpen)', () => {
        const { baseElement } = renderWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        expect(baseElement).toMatchSnapshot();
    });

    it('adds aria-label to menu-button-wrapper when ariaLabel is defined', () => {
        const ariaLabel = 'test-aria-label';
        renderWithProviders(<DropdownMenuButton tag="nav" ariaLabel={ariaLabel} render={TestGroups} />);

        expect(screen.getByTestId('dropdown-container')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('adds aria-label to menu-button when buttonAriaLabel is defined', () => {
        const ariaLabel = 'test-aria-label';
        renderWithProviders(<DropdownMenuButton buttonAriaLabel={ariaLabel} render={TestGroups} />);

        expect(screen.getByTestId('menu-button')).toHaveAttribute('aria-label', ariaLabel);
    });

    it('dropdown-menu is open when defaultOpen prop is set to true', () => {
        renderWithProviders(<DropdownMenuButton defaultOpen render={TestGroups} />);

        expect(screen.getByTestId('menu-dropdownMenu')).toBeInTheDocument();
    });

    it('opens dropdown-menu when menu-button is clicked', async () => {
        const user = userEvent.setup();
        renderWithProviders(<DropdownMenuButton render={() => <div />} />);

        await user.click(screen.getByTestId('menu-button'));

        expect(screen.getByTestId('menu-dropdownMenu')).toBeInTheDocument();
    });

    it('should close nav-menu when escape key is pressed in dropdown-menu', async () => {
        const user = userEvent.setup();
        renderWithProviders(<DropdownMenuButton defaultOpen render={TestGroups} />);

        const item = screen.getByTestId('listitem-optionA');
        item.focus();
        await user.keyboard('{Escape}');

        expect(screen.queryByTestId('menu-dropdownMenu')).not.toBeInTheDocument();
    });

    it('focuses menu-button when escape key is pressed in dropdown-menu', async () => {
        const user = userEvent.setup();
        renderWithProviders(<DropdownMenuButton defaultOpen render={TestGroups} />);

        const item = screen.getByTestId('listitem-optionA');
        item.focus();
        await user.keyboard('{Escape}');

        expect(screen.getByTestId('menu-button')).toHaveFocus();
    });

    it('renders nav container tag when "tag" prop is set to nav', () => {
        renderWithProviders(<DropdownMenuButton tag="nav" render={TestGroups} />);

        expect(screen.getByTestId('dropdown-container').tagName).toBe('NAV');
    });

    it('renders div container tag when "tag" prop is set to div', () => {
        renderWithProviders(<DropdownMenuButton tag="div" render={TestGroups} />);

        expect(screen.getByTestId('dropdown-container').tagName).toBe('DIV');
    });
});
