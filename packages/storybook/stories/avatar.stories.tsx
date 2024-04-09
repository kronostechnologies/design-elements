import { Avatar } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import AvatarImg from './assets/avatars.png';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Avatar',
    component: Avatar,
};


export const TextAvatar: Story = () => <Avatar username="Patrick B" size="medium" />;
TextAvatar.decorators = [DesktopDecorator];

export const ImageAvatar: Story = () => <Avatar username="John" size="medium" imgSrc={AvatarImg} />;
ImageAvatar.decorators = [DesktopDecorator];

export const IconAvatar: Story = () => <Avatar size="medium" />;
IconAvatar.decorators = [MobileDecorator];
