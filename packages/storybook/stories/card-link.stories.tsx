import { CardLink } from '@equisoft/design-elements-react';
import { Story } from '@storybook/react';
import React from 'react';
import { RouterDecorator } from './utils/router-decorator';

export default {
    title: 'Card Link',
    component: CardLink,
    decorators: [RouterDecorator],
};

export const Normal: Story = () => (
    <CardLink label="Label" href="/" />
);
