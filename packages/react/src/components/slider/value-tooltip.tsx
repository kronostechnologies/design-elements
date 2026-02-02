import { FunctionComponent } from 'react';
import { SliderValueLabelSlotProps } from '@mui/base/Slider';
import styled from 'styled-components';

export const ValueTooltipContainer = styled.div`
    background-color: ${({ theme }) => theme.component['tooltip-popper-container-default-background-color']};
    border: 1px solid ${({ theme }) => theme.component['tooltip-popper-container-border-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 rgb(0 0 0 / 19%);
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['tooltip-popper-container-text-color']};
    font-size: 0.75rem;
    padding: var(--spacing-half) var(--spacing-1x);
    position: absolute;
    top: 2.5rem;
    transform: scale(0);
    transform-origin: 50% -0.49rem;
    transition: transform 0.12s;

    &::before {
        border-color: transparent transparent ${({ theme }) => theme.component['tooltip-popper-container-default-background-color']} transparent;
        border-style: solid;
        border-width: 0 0.5rem 0.5rem;
        content: '';
        height: 0;
        left: 50%;
        position: absolute;
        top: -0.49rem;
        transform: translateX(-50%);
        width: 0;
    }
`;

export const ValueTooltip: FunctionComponent<SliderValueLabelSlotProps> = ({ children }) => (
    <ValueTooltipContainer>
        {children}
    </ValueTooltipContainer>
);

ValueTooltip.displayName = 'ValueTooltip';
