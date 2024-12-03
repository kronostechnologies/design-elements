import styled from 'styled-components';
import { Tooltip } from '../tooltip/tooltip';

export const StyledWrapper = styled.div`
    align-items: center;
    display: flex;
`;

export const StyledLabel = styled.label<{ $isMobile: boolean }>`
    color: ${(props) => props.theme.component['label-text-color']};
    display: block;
    font-size: ${({ $isMobile }) => ($isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ $isMobile }) => ($isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    width: fit-content;

    input + & {
        margin-left: var(--spacing-half);
    }
`;

export const StyledTooltip = styled(Tooltip)`
    margin-left: calc(var(--spacing-1x) * 1.5);
`;
