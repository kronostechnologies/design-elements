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
    const strokeDashoffset =
      this.circumference - (progress / 100) * this.circumference;
    const PlaceholderDashoffset = this.circumference - 1 * this.circumference;

    const Number = styled.div`
      width: ${props => props.rad * 2}px;
      height: ${props => props.rad * 2}px;
      display: flex;
      justify-content: center;
      align-items: center;
      position: absolute;
      top: 0;
      left: 0;
    `;

    const Label = styled.p`
      width: ${props => props.rad * 2}px;
      text-align: center;
    `;

    const style = {
      position: "relative"
    };

    return (
      <div>
        <div>
          <svg height={radius * 2} width={radius * 2} style={style}>
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
            <circle
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
          <Number rad={radius}>
            <p>{this.props.number}</p>
          </Number>
        </div>
        <Label rad={radius}>{this.props.label}</Label>
      </div>
    );
  }
}

export default ProgressRing;
