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
        disabled: true,
    },
    {
        label: 'Google',
        value: 'google',
        href: 'https://www.google.ca',
        isHtmlLink: true,
    },
] as NavItemProps[];

export const Normal: Story = () => (
    <UserProfile options={options} username="John Doe" />
);

export const Desktop: Story = () => (
    <UserProfile options={options} username="John Doe" userEmail="John.doe@gmail.com" />
);
Desktop.decorators = [DesktopDecorator];

export const Mobile: Story = () => (
    <UserProfile options={options} username="John Doe" userEmail="John.doe@gmail.com" />
);
Mobile.decorators = [MobileDecorator];

export const WithDivContainer: Story = () => (
    <UserProfile isDiv options={options} username="John Doe" />
);

export const DefaultOpen: Story = () => (
    <UserProfile options={options} username="Jonh Doe" defaultOpen />
);
