import { GlobalHeader, UserProfile } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { ReactElement, VoidFunctionComponent } from 'react';
import CustomLogoSvg from './assets/customLogo.svg';
import { MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Structure/Global Header',
    component: GlobalHeader,
    decorators: [RouterDecorator],
};

const drawerContent: ReactElement = (
    <div style={{ padding: '16px' }}>
        <h2>Section 1</h2>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, accusamus.</p>
        <h2>Section 2</h2>
        <hr />
        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Laboriosam, accusamus.</p>
    </div>
);

export const Normal: Story = () => (
    <GlobalHeader>
        <p>Hello world</p>
    </GlobalHeader>
);

export const WithAppName: Story = () => (
    <GlobalHeader appName="analyze">
        <p>Hello world</p>
    </GlobalHeader>
);

const CustomLogo: VoidFunctionComponent = () => <img src={CustomLogoSvg} />;

export const WithCustomLogo: Story = () => (
    <GlobalHeader customLogo={<CustomLogo />}>
        <p>Hello world</p>
    </GlobalHeader>
);

export const WithAppTitleDesktop: Story = () => (
    <GlobalHeader appTitleDesktop="App title">
        <p>Hello world</p>
    </GlobalHeader>
);

export const WithMobileDrawer: Story = () => (
    <GlobalHeader mobileDrawerContent={drawerContent}>
        <p>Hello world</p>
    </GlobalHeader>
);
WithMobileDrawer.decorators = [MobileDecorator];

export const WithSkipLink: Story = () => (
    <GlobalHeader skipLink={{ href: '#' }}>
        <p>Hello world</p>
    </GlobalHeader>
);

export const WithSkipLinkAndUserProfile: Story = () => (
    <GlobalHeader skipLink={{ href: '#' }}>
        <p>Hello world</p>
        <UserProfile
            username="Mon user"
            options={[{
                value: 'Something',
                href: '#',
            },
            ]}
        />
    </GlobalHeader>
);

export const WithoutReactRouter: Story = () => (
    <GlobalHeader usesReactRouter={false} logoHref="https://www.google.com/">
        <p>Hello world</p>
    </GlobalHeader>
);
