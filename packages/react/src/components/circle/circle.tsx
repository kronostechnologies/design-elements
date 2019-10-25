import React from 'react';

import styled from 'styled-components';
import { equisoftTheme } from '../../themes/equisoft';

interface CircleProps {
    radius: number;
    stroke: number;
    percent: number;
    color: string;
}

const CirclePath = styled.circle`
    transform: rotate(90deg);
    transform-origin: 50% 50%;
`;

const Circle = ({ radius, stroke, percent, color }: CircleProps) => {
    const normalizedRadius = radius - (stroke * 2);
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - ((percent / 100) * circumference);

    return (
        <svg height={radius * 2} width={radius * 2}>
            <circle
                stroke={equisoftTheme.greys.grey}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
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
