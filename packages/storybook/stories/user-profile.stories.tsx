import React, { ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { Story } from '@storybook/react';
import { ApplicationMenu, UserProfile } from '@equisoft/design-elements-react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

const StyledDiv = styled.div`
    height: 200px;
`;

export default {
    title: 'User Profile',
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

const options = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        value: 'optionB',
        href: '/testb',
    },
    {
        label: 'Option C',
        value: 'optionC',
        href: '/testc',
    },
    {
        label: 'Option D',
        value: 'optionD',
        href: '/testd',
    },
];

export const Desktop: Story = () => (
    <UserProfile options={options} username="John Doe" />
);
Desktop.decorators = [DesktopDecorator];

export const Mobile: Story = () => (
    <UserProfile options={options} username="John Doe" />
);
Mobile.decorators = [MobileDecorator];

export const DefaultOpen: Story = () => (
    <UserProfile options={options} username="Jonh Doe" defaultOpen />
);
