import { Dropdown, DropdownMenu, GroupItem, NavItem, NavList } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { rawCodeParameters } from './utils/parameters';

const Container = styled.div`
    height: 260px;
`;

export default {
    title: 'Components/Controls/Dropdown',
    component: Dropdown,
    decorators: (StoryComponent: ComponentType) => [
        <Router>
            <StoryComponent />
        </Router>,
    ],
};

export const DropdownDropdownMenu: Story = () => (
    <Dropdown
        dropdownComponent={DropdownMenu}
    >
        <GroupItem>
            <NavItem label="Item 1" value="Pew" href="google.com" />
            <NavItem label="Item 2" value="Pow" href="google.ca" />
        </GroupItem>
    </Dropdown>
);
DropdownDropdownMenu.parameters = rawCodeParameters;

export const DropdownNavList: Story = () => (
    <Dropdown
        dropdownComponent={NavList}
    >
        <NavList
            options={[
                { label: 'Option A', value: 'optionA', href: '/testa' },
                { label: 'Option B', lozenge: 'New', value: 'optionB', href: '/testb' },
                { label: 'Option C', value: 'optionC', href: '/testc', disabled: true },
                { label: 'Google', value: 'google', href: 'https://www.google.ca', isHtmlLink: true },
            ]}
        />
    </Dropdown>
);
DropdownNavList.parameters = rawCodeParameters;
