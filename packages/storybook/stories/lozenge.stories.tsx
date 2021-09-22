import React from 'react';
import { Lozenge } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import { MobileDecorator } from './utils/device-context-decorator';

export default {
    title: 'Structure/Lozenge',
    component: Lozenge,
};

export const Normal: Story = () => (
    <Lozenge>This is to highlight some text</Lozenge>
);

export const Mobile: Story = () => (
    <Lozenge>This is to highlight some text</Lozenge>
);
Mobile.decorators = [MobileDecorator];
