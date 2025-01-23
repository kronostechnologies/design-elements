import { GlobalHeader } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import { ReactElement } from 'react';
import CustomLogoSvg from './assets/customLogo.svg';
import { RouterDecorator } from './utils/router-decorator';

const GlobalHeaderMeta: Meta<typeof GlobalHeader> = {
    title: 'Components/Global Header',
    component: GlobalHeader,
    decorators: [RouterDecorator],
    argTypes: {
        customLogo: {
            control: { disable: true },
        },
        mobileDrawerContent: {
            control: { disable: true },
        },
        skipLink: {
            control: { disable: true },
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

export default GlobalHeaderMeta;
type Story = StoryObj<typeof GlobalHeader>;

export const Default: Story = {
    args: {
        mobileDrawerContent: drawerContent,
    },
};

const customLogo: ReactElement = (
    <img src={CustomLogoSvg} />
);

export const WithCustomLogo: Story = {
    args: {
        customLogo,
        mobileDrawerContent: drawerContent,
    },
};
