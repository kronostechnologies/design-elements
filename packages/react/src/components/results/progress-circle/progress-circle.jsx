import React from "react";
import styled from "styled-components";

import { Circle } from './circle/circle';

// Source: https://css-tricks.com/building-progress-ring-quickly/
const progressCircle = ({ percent, color, label, main, result }) => {
    const radius = 73;
    const stroke = 8;

    // Styled Components
    const Container = styled.div`
        display: inline-block;
    `;

    const Wrapper = styled.div`
        position: relative;
        width: ${(radius * 2) / 16}rem;
        height: ${(radius * 2) / 16}rem;
    `;

    const Number = styled.div`
        width: ${(radius * 2) / 16}rem;
        height: ${(radius * 2) / 16}rem;
        display: flex;
        justify-content: center;
        align-items: center;
        position: absolute;
        top: 0;
        left: 0;
        p {
          font-size: 1.625rem;
        }
    `;

    const Label = styled.p`
        width: ${(radius * 2) / 16}rem;
        text-align: center;
        color: ${props => props.main ? 'rgb(0,0,0)' : "rgb(87,102,110)"};
    `;

    return (
        <Container>
            <Wrapper>
                <Circle radius={radius} stroke={stroke} percent={percent} color={color} />
                <Number>
                    <p>{result}</p>
                </Number>
            </Wrapper>
            <Label main={main}>{label}</Label>
        </Container>
    );
};

export default progressCircle;
