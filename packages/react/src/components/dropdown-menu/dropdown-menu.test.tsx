import { shallow } from 'enzyme';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
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
    test('Calls onKeyDown callback when a key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<DropdownMenu onKeyDown={callback}>{TestGroups}</DropdownMenu>);

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: '' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

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

    test('has controllable data-testid', () => {
        const tree = shallow(
            <DropdownMenu data-testid="some-data-testid" hidden>{TestGroups}</DropdownMenu>,
        );

        expect(getByTestId(tree, 'some-data-testid').exists()).toBe(true);
    });
});
