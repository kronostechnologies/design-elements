import { Avatar } from '@equisoft/design-elements-react';
import { Meta, StoryObj } from '@storybook/react';
import AvatarImg from './assets/avatars.png';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

const meta: Meta<typeof Avatar> = {
    title: 'Components/Avatar',
    component: Avatar,
};

export default meta;

type Story = StoryObj<typeof Avatar>;

export const TextAvatar: Story = {
    args: {
        size: 'medium',
        username: 'Patrick B',
    },
    decorators: [DesktopDecorator],
};

export const ImageAvatar: Story = {
    args: {
        size: 'medium',
        imgSrc: AvatarImg,
        username: 'John',
    },
    decorators: [DesktopDecorator],
};

export const IconAvatar: Story = {
    args: {
        size: 'medium',
    },
    decorators: [MobileDecorator],
};
