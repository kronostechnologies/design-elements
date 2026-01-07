import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { renderWithProviders } from '../../test-utils/renderer';
import { DropdownMenu } from './dropdown-menu';
import { ExternalItem, GroupItem, NavItem } from './list-items';

const TestGroups = (
    <>
        <GroupItem id="firstGroup">
            <NavItem value="optionA" href="/testA" />
            <NavItem value="optionB" href="/testB" />
            <NavItem value="optionC" href="/testC" />
        </GroupItem>
        <GroupItem id="secondGroup">
            <ExternalItem label="ExternalA" href="https://external-link.com/a" />
            <ExternalItem label="ExternalB" href="https://external-link.com/b" />
            <ExternalItem label="ExternalC" href="https://external-link.com/c" />
        </GroupItem>
    </>
);

describe('DropdownMenu', () => {
    it('matches the snapshot', () => {
        const { container } = renderWithProviders(
            <DropdownMenu>{TestGroups}</DropdownMenu>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    it('calls onKeyDown callback when a key is pressed on option', async () => {
        const user = userEvent.setup();
        const callback = jest.fn();
        renderWithProviders(<DropdownMenu onKeyDown={callback}>{TestGroups}</DropdownMenu>);

        await user.type(screen.getByTestId('listitem-optionA'), '{enter}');

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('has controllable data-testid', () => {
        renderWithProviders(
            <DropdownMenu data-testid="some-data-testid">{TestGroups}</DropdownMenu>,
        );

        expect(screen.getByTestId('some-data-testid')).toBeInTheDocument();
    });
});
