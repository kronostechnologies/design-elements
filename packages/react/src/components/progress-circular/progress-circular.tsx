import { VoidFunctionComponent } from 'react';
import styled, { useTheme } from 'styled-components';

const sizes = {
    xsmall: 16,
    small: 24,
    medium: 32,
    large: 64,
};

type Size = keyof typeof sizes;

const VIEWBOX = 64;
const STROKE_WIDTH = 8;
const RADIUS = (VIEWBOX - STROKE_WIDTH) / 2;
const CENTER_XY = VIEWBOX / 2;
const CIRCUMFERENCE = RADIUS * 2 * Math.PI;

const Circle = styled.circle`
    transition: stroke-dashoffset 850ms ease;
`;

export interface ProgressCircularProps {
    className?: string;
    size?: Size;
    inverted?: boolean;
    value: number;
}

// Source: https://css-tricks.com/building-progress-ring-quickly/
export const ProgressCircular: VoidFunctionComponent<ProgressCircularProps> = ({
    className,
    inverted = false,
    size = 'medium',
    value,
}) => {
    const theme = useTheme();
    const strokeDashoffset = (1 - (value / 100)) * CIRCUMFERENCE;

    return (
        <svg
            width={sizes[size]}
            height={sizes[size]}
            viewBox={`0 0 ${VIEWBOX} ${VIEWBOX}`}
            className={className}
            aria-hidden="true"
            focusable="false"
        >
            <Circle
                cx={CENTER_XY}
                cy={CENTER_XY}
                r={RADIUS}
                stroke={inverted
                    ? theme.component['progress-circular-inverted-color']
                    : theme.component['progress-circular-color']}
                strokeWidth={STROKE_WIDTH}
                fill="none"
                strokeDasharray={CIRCUMFERENCE}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform={`rotate(-90 ${CENTER_XY} ${CENTER_XY})`}
            />
        </svg>
    );
};

ProgressCircular.displayName = 'ProgressCircular';
