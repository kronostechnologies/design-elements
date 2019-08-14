import React from 'react';
import styled from 'styled-components';

const Circle = ({ radius, stroke, percent, color }) => {
    const normalizedRadius = radius - (stroke * 2);
    const circumference = normalizedRadius * 2 * Math.PI;
    const placeholderDashoffset = circumference - (1 * circumference);
    const strokeDashoffset = circumference - ((percent / 100) * circumference);

    const CirclePath = styled.circle`
      transform: rotate(90deg);
      transform-origin: 50% 50%;
    `;

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke="#DCDCDC"
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ placeholderDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <CirclePath
                stroke={color}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                style={{ strokeDashoffset }}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </svg>
    );
};

export { Circle };
