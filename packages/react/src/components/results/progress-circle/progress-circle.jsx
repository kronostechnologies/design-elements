import React from 'react';
import styled from 'styled-components';

import { Circle } from './circle/circle';

// Source: https://css-tricks.com/building-progress-ring-quickly/
const ProgressCircle = ({ percent, color, label, main, result }) => {
    const radius = 73;
    const stroke = 8;

    // Styled Components
    const Container = styled.div`
    display: inline-block;
  `;

    const Wrapper = styled.div`
    height: ${(radius * 2) / 16}rem;
    position: relative;
    width: ${(radius * 2) / 16}rem;
  `;

    const Number = styled.div`
    align-items: center;
    display: flex;
    height: ${(radius * 2) / 16}rem;
    justify-content: center;
    left: 0;
    position: absolute;
    top: 0;
    width: ${(radius * 2) / 16}rem;
    p {
      font-size: 1.625rem;
    }
  `;

    const Label = styled.p`
    color: ${props => (props.main ? 'rgb(0,0,0)' : 'rgb(87,102,110)')};
    text-align: center;
    width: ${(radius * 2) / 16}rem;
  `;

    return (
        <Container>
            <Wrapper>
                <Circle
                    radius={radius}
                    stroke={stroke}
                    percent={percent}
                    color={color}
                />
                <Number>
                    <p>{result}</p>
                </Number>
            </Wrapper>
            <Label main={main}>{label}</Label>
        </Container>
    );
};

export default ProgressCircle;
