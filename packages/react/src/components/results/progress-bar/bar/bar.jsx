import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  p {
    color: ${props => (props.secondary ? 'rgb(87, 102, 110)' : 'rgb(0, 0, 0)')};
    margin: 0;
    text-align: right;
    width: 8.5rem;
  }
`;

const Progress = styled.div `
  background-color: rgb(220, 220, 220);
  border-radius: 4rem;
  height: 0.55rem;
  width: 100%;
`;

const Bar = styled.div `
  background: ${props => props.color};
  border-radius: 4rem;
  height: 0.55rem;
  width: ${props => Math.min(Math.max(props.percent, 0), 100)}%;
`;

const bar = ({ color, percent, endLabel, secondary }) => (
    <Container secondary={secondary}>
        <Progress>
            <Bar color={color} percent={percent} />
        </Progress>
        <p>{endLabel}</p>
    </Container>
);

export default bar;
