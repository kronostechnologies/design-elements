import { Avatar } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Avatar',
    component: Avatar,
};

export const Desktop: Story = () => <Avatar username="Patrick B" />;
Desktop.decorators = [DesktopDecorator];

export const Mobile: Story = () => <Avatar username="John" />;
Mobile.decorators = [MobileDecorator];
