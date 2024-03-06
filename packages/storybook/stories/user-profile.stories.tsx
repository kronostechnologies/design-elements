import { GlobalHeader, NavItemProps, UserProfile } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ComponentType } from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import styled from 'styled-components';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

const StyledDiv = styled.div`
    height: 200px;
`;

export default {
    title: 'Patterns/User Profile',
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
};

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
        label: 'Google',
        value: 'google',
        href: 'https://www.google.ca',
        isExternalLink: true,
    },
];

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

export const WithNavContainer: Story = () => (
    <UserProfile tag="nav" options={options} username="John Doe" />
);

export const DefaultOpen: Story = () => (
    <UserProfile options={options} username="Jonh Doe" defaultOpen />
);
