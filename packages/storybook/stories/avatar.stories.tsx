import { Avatar } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';
import AvatarImg from './assets/avatars.png';

export default {
    title: 'Avatar',
    component: Avatar,
};

export const Desktop: Story = () => <Avatar username="Patrick B" />;
Desktop.decorators = [DesktopDecorator];

export const smallSizeAvatar: Story = () => <Avatar username="Patrick B" size="small" />;
smallSizeAvatar.decorators = [DesktopDecorator];

export const mediumSizeAvatar: Story = () => <Avatar username="Patrick B" size="medium" />;
mediumSizeAvatar.decorators = [DesktopDecorator];

export const largeSizeAvatar: Story = () => <Avatar username="Patrick B" size="large" />;
largeSizeAvatar.decorators = [DesktopDecorator];

export const Mobile: Story = () => <Avatar username="John" />;
Mobile.decorators = [MobileDecorator];

export const smallSizeMobileAvatar: Story = () => <Avatar username="John" size="small" />;
smallSizeMobileAvatar.decorators = [MobileDecorator];

export const mediumSizeMobileAvatar: Story = () => <Avatar username="John" size="medium" />;
mediumSizeMobileAvatar.decorators = [MobileDecorator];

export const largeSizeMobileAvatar: Story = () => <Avatar username="John" size="large" />;
largeSizeMobileAvatar.decorators = [MobileDecorator];

export const avatarWithSpecificColor: Story = () => <Avatar username="John" size="medium" bgColor="#fcdf03" />;
avatarWithSpecificColor.decorators = [DesktopDecorator];

export const avatarWithImage: Story = () => <Avatar username="John" size="large" imgSrc={AvatarImg} />;
avatarWithImage.decorators = [DesktopDecorator];

export const EmptyUsername: Story = () => <Avatar username="" />;
EmptyUsername.decorators = [DesktopDecorator];

export const WithoutUsernameMobile: Story = () => <Avatar />;
WithoutUsernameMobile.decorators = [MobileDecorator];
