import { Avatar, AvatarSize } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Avatar',
    component: Avatar,
};

export const Desktop: Story = () => <Avatar username="Patrick B" />;
Desktop.decorators = [DesktopDecorator];

export const smallSizeAvatar: Story = () => <Avatar username="Patrick B" size={AvatarSize.Small} />;
smallSizeAvatar.decorators = [DesktopDecorator];

export const mediumSizeAvatar: Story = () => <Avatar username="Patrick B" size={AvatarSize.Medium} />;
mediumSizeAvatar.decorators = [DesktopDecorator];

export const largeSizeAvatar: Story = () => <Avatar username="Patrick B" size={AvatarSize.Large} />;
largeSizeAvatar.decorators = [DesktopDecorator];

export const Mobile: Story = () => <Avatar username="John" />;
Mobile.decorators = [MobileDecorator];

export const smallSizeMobileAvatar: Story = () => <Avatar username="John" size={AvatarSize.Small} />;
smallSizeMobileAvatar.decorators = [MobileDecorator];

export const mediumSizeMobileAvatar: Story = () => <Avatar username="John" size={AvatarSize.Medium} />;
mediumSizeMobileAvatar.decorators = [MobileDecorator];

export const largeSizeMobileAvatar: Story = () => <Avatar username="John" size={AvatarSize.Large} />;
largeSizeMobileAvatar.decorators = [MobileDecorator];
