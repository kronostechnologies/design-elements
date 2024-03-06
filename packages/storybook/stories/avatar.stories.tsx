import { Avatar } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import AvatarImg from './assets/avatars.png';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Components/Avatar',
    component: Avatar,
};

export const Desktop: Story = () => <Avatar username="Patrick B" />;
Desktop.decorators = [DesktopDecorator];

export const SmallSizeAvatar: Story = () => <Avatar username="Patrick B" size="small" />;
SmallSizeAvatar.decorators = [DesktopDecorator];

export const MediumSizeAvatar: Story = () => <Avatar username="Patrick B" size="medium" />;
MediumSizeAvatar.decorators = [DesktopDecorator];

export const LargeSizeAvatar: Story = () => <Avatar username="Patrick B" size="large" />;
LargeSizeAvatar.decorators = [DesktopDecorator];

export const Mobile: Story = () => <Avatar username="John" />;
Mobile.decorators = [MobileDecorator];

export const SmallSizeMobileAvatar: Story = () => <Avatar username="John" size="small" />;
SmallSizeMobileAvatar.decorators = [MobileDecorator];

export const MediumSizeMobileAvatar: Story = () => <Avatar username="John" size="medium" />;
MediumSizeMobileAvatar.decorators = [MobileDecorator];

export const LargeSizeMobileAvatar: Story = () => <Avatar username="John" size="large" />;
LargeSizeMobileAvatar.decorators = [MobileDecorator];

export const AvatarWithSpecificColor: Story = () => <Avatar username="John" size="medium" bgColor="#fcdf03" />;
AvatarWithSpecificColor.decorators = [DesktopDecorator];

export const AvatarWithImage: Story = () => <Avatar username="John" size="large" imgSrc={AvatarImg} />;
AvatarWithImage.decorators = [DesktopDecorator];

export const EmptyUsername: Story = () => <Avatar username="" />;
EmptyUsername.decorators = [DesktopDecorator];

export const WithoutUsernameMobile: Story = () => <Avatar />;
WithoutUsernameMobile.decorators = [MobileDecorator];
