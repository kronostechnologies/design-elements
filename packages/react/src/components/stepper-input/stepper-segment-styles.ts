import { css } from 'styled-components';

export const stepperSegmentSurfaceStyles = css`
    background: var(--stepper-segment-background-color);
    border-bottom: 1px solid var(--stepper-segment-border-color);
    border-left: none;
    border-right: none;
    border-top: 1px solid var(--stepper-segment-border-color);
`;

export const stepperSegmentMiddleCornerStyles = css`
    border-radius: var(--border-radius-none, 0);
`;

export const stepperSegmentLeadingCornerStyles = css`
    border-radius: var(--border-radius) 0 0 var(--border-radius);
`;

export const stepperSegmentTrailingCornerStyles = css`
    border-radius: 0 var(--border-radius) var(--border-radius) 0;
`;

export const stepperSegmentLeadingEdgeStyles = css`
    border-left: 1px solid var(--stepper-segment-border-color);
`;

export const stepperSegmentTrailingDividerStyles = css`
    border-right: 1px solid var(--stepper-segment-border-color);
`;
