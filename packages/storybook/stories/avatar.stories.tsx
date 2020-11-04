import { Avatar } from '@equisoft/design-elements-react';
import React from 'react';
import { DesktopDecorator, MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Avatar',
    component: Avatar,
};

export const desktop = () => {
    return <Avatar username="Patrick B" />;
};
desktop.decorators = [DesktopDecorator];

export const mobile = () => {
    return <Avatar username="John" />;
};
mobile.decorators = [MobileDecorator];
