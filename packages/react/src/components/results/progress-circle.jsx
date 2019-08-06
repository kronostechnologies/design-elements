import React, { Component } from "react";
import styled from "styled-components";

// Source: https://css-tricks.com/building-progress-ring-quickly/
class ProgressRing extends React.Component {
  constructor(props) {
    super(props);

    const { radius, stroke } = this.props;
    this.normalizedRadius = radius - stroke * 2;
    this.circumference = this.normalizedRadius * 2 * Math.PI;
  }

  render() {
    const { radius, stroke, progress } = this.props;
    const PlaceholderDashoffset = this.circumference - 1 * this.circumference;
    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;

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
              strokeDasharray={this.circumference + " " + this.circumference}
              style={{ PlaceholderDashoffset }}
              stroke-width={stroke}
              strokeLinecap="round"
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
            <CirclePath
              stroke={this.props.color}
              fill="transparent"
              strokeWidth={stroke}
              strokeDasharray={this.circumference + " " + this.circumference}
              style={{ strokeDashoffset }}
              stroke-width={stroke}
              strokeLinecap="round"
              r={this.normalizedRadius}
              cx={radius}
              cy={radius}
            />
          </svg>
          <Number>
            <p>{this.props.number}</p>
          </Number>
        </Wrapper>
        <Label>{this.props.label}</Label>
      </Container>
    );
  }
}

export default ProgressRing;
