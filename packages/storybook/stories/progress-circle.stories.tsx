import { ProgressCircle } from '@equisoft/design-elements-react';
import { StoryFn as Story } from '@storybook/react';
import styled from 'styled-components';

export default {
    title: 'Data/Progress Circle',
    component: ProgressCircle,
};

const SmallContainer = styled.div`
    width: 124px;
`;

export const Small: Story = () => (
    <SmallContainer>
        <ProgressCircle
            descriptionLabel="RRSP"
            resultLabel="56 k$"
            percent={66}
            color="#0080A5"
        />
    </SmallContainer>
);

const LargeContainer = styled.div`
    width: 168px;
`;

export const Large: Story = () => (
    <LargeContainer>
        <ProgressCircle
            descriptionLabel="RRSP"
            resultLabel="56 k$"
            percent={66}
            color="#012639"
        />
    </LargeContainer>
);
