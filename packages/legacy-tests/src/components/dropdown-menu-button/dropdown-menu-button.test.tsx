import { shallow } from 'enzyme';
import { ReactElement } from 'react';
import { DropdownMenuButton } from '~/components/dropdown-menu-button/dropdown-menu-button';
import { ExternalItem, GroupItem, GroupItemProps, NavItem } from '~/components/dropdown-menu/list-items';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders } from '../../test-utils/renderer';

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
    it('adds aria-label to menu-button-wrapper when ariaLabel is defined', () => {
        const ariaLabel = 'test-aria-label';

        const wrapper = shallow(<DropdownMenuButton tag="nav" ariaLabel={ariaLabel} render={TestGroups} />);

        expect(getByTestId(wrapper, 'dropdown-container').prop('aria-label')).toBe(ariaLabel);
    });

    it('adds aria-label to menu-button when buttonAriaLabel is defined', () => {
        const ariaLabel = 'test-aria-label';

        const wrapper = shallow(<DropdownMenuButton buttonAriaLabel={ariaLabel} render={TestGroups} />);

        expect(getByTestId(wrapper, 'menu-button').prop('aria-label')).toBe(ariaLabel);
    });

    it('dropdown-menu is open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        expect(getByTestId(wrapper, 'menu-dropdownMenu').prop('hidden')).toBe(false);
    });

    it('Opens dropdown-menu when menu-button is clicked', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton render={() => <div />} />,
        );

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-dropdownMenu').prop('hidden')).toBe(false);
    });

    it('Should close nav-menu when escape key is pressed in dropdown-menu', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu-dropdownMenu').prop('hidden')).toBe(true);
    });

    it('Focuses menu-button when escape key is pressed in dropdown-menu', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
            { attachTo: document.body },
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
    });

    it('Renders nav container tag when "tag" prop is set to nav', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton tag="nav" render={TestGroups} />,
        );

        const dropDownContainer = getByTestId(wrapper, 'dropdown-container');
        expect(dropDownContainer.prop('as')).toEqual('nav');
    });

    it('Renders div container tag when "tag" prop is set to div', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton tag="div" render={TestGroups} />,
        );

        const dropDownContainer = getByTestId(wrapper, 'dropdown-container');
        expect(dropDownContainer.prop('as')).toEqual('div');
    });
});
