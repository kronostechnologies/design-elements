import React from 'react';
import { Story } from '@storybook/react';

import { PhoneInput } from '@equisoft/design-elements-react';
import { DesktopDecorator } from './utils/device-context-decorator';

export default {
    title: 'Phone Input',
    component: PhoneInput,
};

export const normal: Story = () => <PhoneInput pattern='(___) ___-____' value='' />;
normal.decorators = [DesktopDecorator];
