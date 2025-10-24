import { GlobalHeader, NavItemProps, UserProfile } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

const StyledDiv = styled.div`
    height: 200px;
`;

const options: NavItemProps[] = [
    {
        label: 'Option A',
        value: 'optionA',
        href: '/testa',
    },
    {
        label: 'Option B',
        lozenge: 'New',
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
        label: 'My Account',
        value: 'My Account',
        href: 'https://www.google.ca',
        isExternalLink: true,
    },
];

const UserProfileMeta: Meta<typeof UserProfile> = {
    title: 'Components/User Profile',
    component: UserProfile,
    decorators: [
        (StoryComponent: ComponentType) => (
            <Router>
                <StyledDiv>
                    <GlobalHeader>
                        <StoryComponent />
                    </GlobalHeader>
                </StyledDiv>
            </Router>
        ),
    ],
    args: {
        options,
        username: 'John Doe',
        userEmail: 'John.doe@gmail.com',
    },
};

export default UserProfileMeta;
type Story = StoryObj<typeof UserProfile>;

export const FullName: Story = {
    args: {
        variant: 'full-name',
    },
    decorators: [DesktopDecorator],
};

export const AvatarOnly: Story = {
    decorators: [DesktopDecorator],
};

export const Mobile: Story = {
    decorators: [MobileDecorator],
};
