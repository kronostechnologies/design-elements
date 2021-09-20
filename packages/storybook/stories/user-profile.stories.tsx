import React, { ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { Story } from '@storybook/react';
import { ApplicationMenu, UserProfile } from '@equisoft/design-elements-react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import { NavItemProps } from '../../react/src/components/dropdown-menu/list-items';

const StyledDiv = styled.div`
    height: 200px;
`;

export default {
    title: 'Structure/User Profile',
    component: UserProfile,
    decorators: [
        (StoryComponent: ComponentType) => (
            <Router>
                <StyledDiv>
                    <ApplicationMenu>
                        <StoryComponent />
                    </ApplicationMenu>
                </StyledDiv>
            </Router>
        ),
    ],
};

const actions = [
    {
        id: 'option-a',
        label: 'Option A',
        value: 'optionA',
        to: '/testa',
    },
    {
        id: 'option-b',
        label: 'Option B',
        value: 'optionB',
        to: '/testb',
    },
    {
        id: 'option-c',
        label: 'Option C',
        value: 'optionC',
        to: '/testc',
    },
    {
        id: 'option-d',
        label: 'Option D',
        value: 'optionD',
        to: '/testd',
    },
] as NavItemProps[];

export const Desktop: Story = () => (
    <UserProfile actions={actions} username="John Doe" userEmail="John.doe@gmail.com" />
);
Desktop.decorators = [DesktopDecorator];

export const Mobile: Story = () => (
    <UserProfile actions={actions} username="John Doe" userEmail="John.doe@gmail.com" />
);
Mobile.decorators = [MobileDecorator];

export const WithUsernamePrefix: Story = () => (
    <UserProfile actions={actions} username="John Doe" usernamePrefix="Connected as" />
);
Desktop.decorators = [DesktopDecorator];

export const DefaultOpen: Story = () => (
    <UserProfile actions={actions} username="Jonh Doe" defaultOpen />
);
