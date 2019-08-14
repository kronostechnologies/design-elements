import React from 'react';
import styled from 'styled-components';

const Container = styled.div `
  align-items: center;
  display: flex;
  margin-bottom: 1rem;
  p {
    color: ${props => (props.main ? 'rgb(0,0,0)' : 'rgb(87,102,110)')};
    margin: 0;
    text-align: right;
    width: 8.5rem;
  }
`;

const Progress = styled.div `
  background-color: rgb(220,220,220);
  border-radius: 4rem;
  height: 0.55rem;
  width: 100%;
`;

const Bar = styled.div `
  background: linear-gradient(to right, ${props => props.color1}, ${props => props.color2 || props.color1} 50%);
  border-radius: 4rem;
  height: 0.55rem;
  width: ${props => props.percent}%;
`;

const bar = ({ main, color1, color2, percent, numbers }) => (
    <Container main={main}>
        <Progress>
            {main ? <Bar color1={color1} color2={color2} percent={percent} /> : <Bar color1={color1} percent={percent} />}
        </Progress>
        <p>{numbers}</p>
    </Container>
);

export default bar;
