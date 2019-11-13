import React, { ReactText } from 'react';

import styled from 'styled-components';
import { Theme } from '../theme-wrapper/theme-wrapper';

const Container = styled.div`
  align-items: center;
  display: flex;
  margin-bottom: 1rem;

  p {
    color: ${(props: {theme: Theme, secondary: boolean}) => props.secondary ? props.theme.greys['dark-grey'] : props.theme.greys.black};
    margin: 0;
    text-align: right;
    width: 8.5rem;
  }
`;

const Progress = styled.div`
  background-color: ${props => props.theme.greys.grey};
  border-radius: 4rem;
  height: 0.55rem;
  width: 100%;
`;

const StyledBar = styled.div`
  background: ${(props: {color?: string, percent: number}) => props.color};
  border-radius: 4rem;
  height: 0.55rem;
  width: ${props => Math.min(Math.max(props.percent, 0), 100)}%;
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
