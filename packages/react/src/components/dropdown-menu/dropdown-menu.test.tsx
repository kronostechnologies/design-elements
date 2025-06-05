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
    test('Matches the snapshot', () => {
        const { container } = renderWithProviders(
            <DropdownMenu>{TestGroups}</DropdownMenu>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });

    test('Is hidden', () => {
        const { container } = renderWithProviders(
            <DropdownMenu hidden>{TestGroups}</DropdownMenu>,
        );

        expect(container.firstChild).toMatchSnapshot();
    });
});
