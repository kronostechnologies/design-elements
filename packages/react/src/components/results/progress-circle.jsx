import React from "react";
import styled from "styled-components";

// Source: https://css-tricks.com/building-progress-ring-quickly/
const progressCircle = props => {

  const { radius, stroke, progress } = props;
  const normalizedRadius = radius - stroke * 2;
  const circumference = normalizedRadius * 2 * Math.PI;
  const PlaceholderDashoffset = circumference - 1 * circumference;
  const strokeDashoffset =
    circumference - (progress / 100) * circumference;

  // Styled Components
  const Number = styled.div`
    width: ${radius * 2}px;
    height: ${radius * 2}px;
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
    width: ${radius * 2}px;
    text-align: center;
  `;

  const CirclePath = styled.circle`
    transform: rotate(90deg);
    transform-origin: 50% 50%;
  `;

  const Wrapper = styled.div`
    position: relative;
    width: ${radius * 2}px;
    height: ${radius * 2}px;
  `;

  const Container = styled.div`
    display: inline-block;
  `;

  return (
    <Container>
      <Wrapper>
        <svg height={radius * 2} width={radius * 2}>
          <circle
            stroke="#DCDCDC"
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ PlaceholderDashoffset }}
            stroke-width={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
          <CirclePath
            stroke={props.color}
            fill="transparent"
            strokeWidth={stroke}
            strokeDasharray={circumference + " " + circumference}
            style={{ strokeDashoffset }}
            stroke-width={stroke}
            strokeLinecap="round"
            r={normalizedRadius}
            cx={radius}
            cy={radius}
          />
        </svg>
        <Number>
          <p>{props.number}</p>
        </Number>
      </Wrapper>
      <Label>{props.label}</Label>
    </Container>
  );
};

export default progressCircle;