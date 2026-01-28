import styled from 'styled-components';
import { FC, SVGProps } from 'react';

const Spinner: FC<SVGProps<SVGSVGElement>> = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" width="16" height="16">
        <radialGradient id="a4" cx=".66" fx=".66" cy=".3125" fy=".3125" gradientTransform="scale(1.5)">
            <stop offset="0" stopColor="currentColor" stopOpacity="0" />
            <stop offset="0.5" stopColor="currentColor" stopOpacity="0.3" />
            <stop offset="1" stopColor="currentColor" />
        </radialGradient>
        <circle
            fill="none"
            stroke="url(#a4)"
            strokeWidth="24"
            strokeLinecap="round"
            strokeDasharray="400 400"
            strokeDashoffset="0"
            cx="100"
            cy="100"
            r="88"
        >
            <animateTransform
                type="rotate"
                attributeName="transform"
                calcMode="spline"
                dur="1s"
                values="0;360"
                keyTimes="0;1"
                keySplines="0 0 1 1"
                repeatCount="indefinite"
            />
        </circle>
        <circle
            fill="none"
            opacity=".2"
            stroke="currentColor"
            strokeWidth="24"
            strokeLinecap="round"
            cx="100"
            cy="100"
            r="88"
        />
    </svg>
);

export const ProgressIndicator = styled(Spinner)`
    color: ${(props) => props.theme.component['spinner-fill-color']};
    height: 64px;
    width: 64px;
`;
