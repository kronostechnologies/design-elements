import { GlobalHeader } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import { ReactElement, VoidFunctionComponent } from 'react';
import CustomLogoSvg from './assets/customLogo.svg';
import { MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Components/Global Header',
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

export const Desktop: Story = () => (
    <GlobalHeader>
        <p>Hello world</p>
    </GlobalHeader>
);

const CustomLogo: VoidFunctionComponent = () => <img src={CustomLogoSvg} />;

export const WithCustomLogo: Story = () => (
    <GlobalHeader customLogo={<CustomLogo />}>
        <p>Hello world</p>
    </GlobalHeader>
);

export const Mobile: Story = () => (
    <GlobalHeader mobileDrawerContent={drawerContent}>
        <p>Hello world</p>
    </GlobalHeader>
);
Mobile.decorators = [MobileDecorator];
