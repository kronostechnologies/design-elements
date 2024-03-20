import { Badge, Icon } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';

export default {
    title: 'Components/Badge',
    component: Badge,
};

export const Normal: Story = () => (
    <Badge value={1}>
        <Icon name="bell" />
    </Badge>
);

export const Dot: Story = () => (
    <Badge value={1} showValue={false}>
        <Icon name="bell" />
    </Badge>
);

export const Overflow: Story = () => (
    <Badge value={10} maxValue={9}>
        <Icon name="bell" />
    </Badge>
);

const Spacer = styled.span`
    margin-right: 4rem;
`;

export const Positions: Story = () => (
    <>
        <Spacer>
            <Badge value={1} position="top-right">
                <Icon name="bell" />
            </Badge>
        </Spacer>
        <Spacer>
            <Badge value={1} position="bottom-right">
                <Icon name="bell" />
            </Badge>
        </Spacer>
        <Spacer>
            <Badge value={1} position="top-left">
                <Icon name="bell" />
            </Badge>
        </Spacer>
        <Spacer>
            <Badge value={1} position="bottom-left">
                <Icon name="bell" />
            </Badge>
        </Spacer>
    </>
);

export const Animated: Story = () => (
    <Badge value={1} animate>
        <Icon name="bell" />
    </Badge>
);
