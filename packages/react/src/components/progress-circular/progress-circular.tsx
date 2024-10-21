import { VoidFunctionComponent } from 'react';
import styled, { useTheme } from 'styled-components';

const sizes = {
    lg: 64,
    md: 32,
    sm: 24,
    xs: 16,
};

type Size = keyof typeof sizes;

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
    size = 'md',
    value,
}) => {
    const theme = useTheme();

    const circumference = 28 * 2 * Math.PI;
    const strokeDashoffset = circumference - ((value / 100) * circumference);

    return (
        <svg
            width={sizes[size]}
            height={sizes[size]}
            viewBox="0 0 64 64"
            className={className}
            aria-hidden="true"
        >
            <Circle
                cx="32"
                cy="32"
                r="28"
                stroke={inverted
                    ? theme.component['progress-circular-inverted-fill-color']
                    : theme.component['progress-circular-fill-color']}
                strokeWidth="8"
                fill="none"
                strokeDasharray={circumference}
                strokeDashoffset={strokeDashoffset}
                strokeLinecap="round"
                transform="rotate(-90 32 32)"
            />
        </svg>
    );
};
