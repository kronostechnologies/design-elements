import React from 'react';
import styled from 'styled-components';
import { ProgressCircle } from './progress-circle';

export default {
    title: 'Results/Progress Circle',
    component: ProgressCircle,
};

export const small = () => (
    <SmallContainer>
        <ProgressCircle
            descriptionLabel="RRSP"
            resultLabel="56 k$"
            percent={66}
            color="#0080A5"
        />
    </SmallContainer>
);

export const large = () => (
    <LargeContainer>
        <ProgressCircle
            descriptionLabel="RRSP"
            resultLabel="56 k$"
            percent={66}
            color="#012639"
        />
    </LargeContainer>
);

const SmallContainer = styled.div`
    width: 124px;
`;

const LargeContainer = styled.div`
    width: 168px;
`;
