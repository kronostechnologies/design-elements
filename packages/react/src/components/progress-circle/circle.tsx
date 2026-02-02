import { VoidFunctionComponent } from 'react';
import styled, { useTheme } from 'styled-components';

const Svg = styled.svg`
    display: block;
`;

const BackgroundCircle = styled.circle``;

const FillCircle = styled.circle`
    transform: rotate(90deg);
    transform-origin: 50% 50%;
`;

interface CircleProps {
    color: string;
    percent: number;
    radius: number;
    stroke: number;
}

export const Circle: VoidFunctionComponent<CircleProps> = ({
    color, percent, radius, stroke,
}) => {
    const normalizedRadius = radius - (stroke / 2);
    const circumference = normalizedRadius * 2 * Math.PI;
    const strokeDashoffset = circumference - ((percent / 100) * circumference);
    const theme = useTheme();
    const diameter = radius * 2;

    return (
        <Svg height="100%" width="100%" viewBox={`0 0 ${diameter} ${diameter}`}>
            <BackgroundCircle
                stroke={theme.component['progress-circle-empty-track-color']}
                fill="transparent"
                strokeWidth={stroke}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
            <FillCircle
                stroke={color}
                fill="transparent"
                strokeWidth={stroke}
                strokeDasharray={`${circumference} ${circumference}`}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                r={normalizedRadius}
                cx={radius}
                cy={radius}
            />
        </Svg>
    );
};

Circle.displayName = 'Circle';
