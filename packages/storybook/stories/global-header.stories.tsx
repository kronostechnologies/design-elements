import { GlobalHeader } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';
import CustomLogoSvg from './assets/customLogo.svg';
import { MobileDecorator } from './utils/device-context-decorator';
import { RouterDecorator } from './utils/router-decorator';

const GlobalHeaderMeta: Meta<typeof GlobalHeader> = {
    title: 'Components/Global Header',
    component: GlobalHeader,
    argTypes: {
        customLogo: {
            control: { type: null },
        },
        mobileDrawerContent: {
            control: { type: null },
        },
        skipLink: {
            control: { type: null },
        },
    },
    render: (args) => (
        <GlobalHeader
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...args}
        >
            <p>Hello world</p>
        </GlobalHeader>
    ),
};

export default GlobalHeaderMeta;
type Story = StoryObj<typeof GlobalHeader>;

export const Desktop: Story = {
    ...GlobalHeaderMeta,
};
Desktop.decorators = [RouterDecorator];

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

export const Mobile: Story = {
    ...GlobalHeaderMeta,
    args: {
        mobileDrawerContent: drawerContent,
    },
};
Mobile.decorators = [RouterDecorator, MobileDecorator];

const customLogo: ReactElement = (
    <img src={CustomLogoSvg} />
);

export const WithCustomLogo: Story = {
    ...GlobalHeaderMeta,
    args: {
        customLogo,
    },
};
WithCustomLogo.decorators = [RouterDecorator];
