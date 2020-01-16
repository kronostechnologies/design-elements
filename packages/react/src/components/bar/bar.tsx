import React, { ReactText } from 'react';

import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';

const Container = styled.div`
    p {
        color: ${(props: { theme: Theme }) => props.theme.greys.black};
        letter-spacing: 0.46px;
        line-height: 1.5rem;
        margin: 0;
        text-align: right;
    }
`;

const Progress = styled.div`
    background-color: ${props => props.theme.greys.grey};
    border-radius: var(--border-radius);
    height: 0.5rem;
    margin-bottom: var(--spacing-half);
    width: 100%;
`;

const StyledBar = styled.div`
    background: ${(props: { color?: string, percent: number }) => props.color};
    border-radius: var(--border-radius);
    height: 0.5rem;
    width: ${props => Math.min(Math.max(props.percent, 0), 100)}%;
`;

interface BarProps {
    color: string;
    percent: number;
    endLabel: ReactText;
}

const Bar = ({ color, percent, endLabel }: BarProps) => (
    <Container>
        <Progress>
            <StyledBar color={color} percent={percent} />
        </Progress>
        <p>{endLabel}</p>
    </Container>
);

export { Bar };
