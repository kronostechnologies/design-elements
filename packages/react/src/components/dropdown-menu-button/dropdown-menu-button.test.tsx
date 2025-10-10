import { fireEvent } from '@testing-library/react';
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
    test('Matches Snapshot', () => {
        const { baseElement, getByTestId } = renderWithProviders(
            <DropdownMenuButton render={TestGroups} />,
        );
        const element = getByTestId('menu-button');
        fireEvent.click(element);

        expect(baseElement).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const { baseElement } = renderWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        expect(baseElement).toMatchSnapshot();
    });
});
