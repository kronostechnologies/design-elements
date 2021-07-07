import { ApplicationMenu } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React, { ReactElement, VoidFunctionComponent } from 'react';
import CustomLogoSvg from './assets/customLogo.svg';
import { MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Structure/Application Menu',
    component: ApplicationMenu,
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
    <ApplicationMenu>
        <p>Hello world</p>
    </ApplicationMenu>
);

export const WithAppName: Story = () => (
    <ApplicationMenu appName="analyze">
        <p>Hello world</p>
    </ApplicationMenu>
);

const CustomLogo: VoidFunctionComponent = () => <img src={CustomLogoSvg} />;

export const WithCustomLogo: Story = () => (
    <ApplicationMenu customLogo={<CustomLogo />}>
        <p>Hello world</p>
    </ApplicationMenu>
);

export const WithMobileDrawer: Story = () => (
    <ApplicationMenu mobileDrawerContent={drawerContent}>
        <p>Hello world</p>
    </ApplicationMenu>
);
WithMobileDrawer.decorators = [MobileDecorator];

export const WithSkipLink: Story = () => (
    <ApplicationMenu skipLinkHref="#">
        <p>Hello world</p>
    </ApplicationMenu>
);
