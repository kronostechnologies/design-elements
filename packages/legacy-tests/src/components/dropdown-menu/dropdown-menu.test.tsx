import { shallow } from 'enzyme';
import { DropdownMenu } from '~/components/dropdown-menu/dropdown-menu';
import { ExternalItem, GroupItem, NavItem } from '~/components/dropdown-menu/list-items';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

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
    it('Calls onKeyDown callback when a key is pressed on option', () => {
        const callback = jest.fn();
        const wrapper = mountWithProviders(<DropdownMenu onKeyDown={callback}>{TestGroups}</DropdownMenu>);

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: '' });

        expect(callback).toHaveBeenCalledTimes(1);
    });

    it('has controllable data-testid', () => {
        const tree = shallow(
            <DropdownMenu data-testid="some-data-testid" hidden>{TestGroups}</DropdownMenu>,
        );

        expect(getByTestId(tree, 'some-data-testid').exists()).toBe(true);
    });
});
