import React, { ReactText } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  p {
    color: ${(props: { secondary: boolean }) => (props.secondary ? 'rgb(87, 102, 110)' : 'rgb(0, 0, 0)')};
    margin: 0;
    text-align: right;
    width: 8.5rem;
  }
`;

const Progress = styled.div`
  background-color: rgb(220, 220, 220);
  border-radius: 4rem;
  height: 0.55rem;
  width: 100%;
`;

const StyledBar = styled.div`
  background: ${props => props.color};
  border-radius: 4rem;
  height: 0.55rem;
  width: ${(props: { percent: number }) => Math.min(Math.max(props.percent, 0), 100)}%;
`;

interface BarProps {
    color: string;
    percent: number;
    endLabel: ReactText;
    secondary?: boolean;
}

const Bar = ({ color, percent, endLabel, secondary }: BarProps) => (
    <Container secondary={secondary || false}>
        <Progress>
            <StyledBar color={color} percent={percent} />
        </Progress>
        <p>{endLabel}</p>
    </Container>
);

export { Bar };
