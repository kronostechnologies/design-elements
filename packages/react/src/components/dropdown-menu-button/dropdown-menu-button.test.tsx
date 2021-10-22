import { shallow } from 'enzyme';
import React, { ReactElement } from 'react';
import { getByTestId } from '../../test-utils/enzyme-selectors';
import { mountWithProviders, renderWithProviders } from '../../test-utils/renderer';
import { DropdownMenuButton } from './dropdown-menu-button';
import { ExternalItem, GroupItem, GroupItemProps, NavItem } from '../dropdown-menu/list-items';

jest.mock('../../utils/uuid');

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
    test('dropdown-menu is open when defaultOpen prop is set to true', () => {
        const wrapper = shallow(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        expect(getByTestId(wrapper, 'menu-dropdownMenu').prop('hidden')).toBe(false);
    });

    test('Opens dropdown-menu when menu-button is clicked', () => {
        const wrapper = shallow(
            <DropdownMenuButton render={() => <></>} />,
        );

        getByTestId(wrapper, 'menu-button').simulate('click');

        expect(getByTestId(wrapper, 'menu-dropdownMenu').prop('hidden')).toBe(false);
    });

    test('Should close nav-menu when escape key is pressed in dropdown-menu', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(getByTestId(wrapper, 'menu-dropdownMenu').prop('hidden')).toBe(true);
    });

    test('Focuses menu-button when escape key is pressed in dropdown-menu', () => {
        const wrapper = mountWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
            { attachTo: document.body },
        );

        getByTestId(wrapper, 'listitem-optionA').simulate('keydown', { key: 'Escape' });

        expect(document.activeElement).toBe(getByTestId(wrapper, 'menu-button').getDOMNode());
    });

    test('Matches Snapshot', () => {
        const tree = renderWithProviders(
            <DropdownMenuButton render={TestGroups} />,
        );

        expect(tree).toMatchSnapshot();
    });

    test('Matches Snapshot (defaultOpen)', () => {
        const tree = renderWithProviders(
            <DropdownMenuButton defaultOpen render={TestGroups} />,
        );

        expect(tree).toMatchSnapshot();
    });
});
