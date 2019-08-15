import React from 'react';
import styled from 'styled-components';

import { Circle } from './circle/circle';

// Source: https://css-tricks.com/building-progress-ring-quickly/
const ProgressCircle = ({ color, descriptionLabel, percent, resultLabel, secondary }) => {
    const radius = 73;
    const stroke = 8;

    const fontColor = secondary ? 'rgb(87,102,110)' : 'rgb(0, 0, 0)';

    // Styled Components
    const Container = styled.div`
      display: inline-block;
    `;

    const Wrapper = styled.div`
      height: ${(radius * 2) / 16}rem;
      position: relative;
      width: ${(radius * 2) / 16}rem;
    `;

    const Result = styled.div`
      align-items: center;
      display: flex;
      height: ${(radius * 2) / 16}rem;
      justify-content: center;
      left: 0;
      position: absolute;
      top: 0;
      width: ${(radius * 2) / 16}rem;
      p {
        color: ${fontColor};
        font-size: 1.625rem;
      }
    `;

    const Label = styled.p`
      color: ${fontColor};
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
                <Result secondary={secondary}>
                    <p>{resultLabel}</p>
                </Result>
            </Wrapper>
            <Label secondary={secondary}>{descriptionLabel}</Label>
        </Container>
    );
};

export default ProgressCircle;
