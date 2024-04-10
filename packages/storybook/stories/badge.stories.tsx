import { Badge, Icon } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';

export default {
    title: 'Components/Badge',
    component: Badge,
};

export const Default: Story = () => (
    <Badge value={1}>
        <Icon name="bell" />
    </Badge>
);

export const Dot: Story = () => (
    <Badge value={1} showValue={false}>
        <Icon name="bell" />
    </Badge>
);
