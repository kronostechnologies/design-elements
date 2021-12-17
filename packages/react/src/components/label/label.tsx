import { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Tooltip } from '../tooltip/tooltip';

const StyledLabel = styled.label<{isMobile: boolean}>`
    align-items: center;
    color: ${(props) => props.theme.greys.black};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => (isMobile ? '1.5rem' : '1.25rem')};
    margin: 0;
    width: fit-content;

    input + & {
        margin-left: var(--spacing-half);
    }
`;

const StyledTooltip = styled(Tooltip)`
    margin-left: calc(var(--spacing-1x) * 1.5);
`;

interface LabelProps {
    className?: string;
    children: ReactNode;
    forId: string;
    tooltipLabel?: string;
}

function Label({
    className, children, forId, tooltipLabel,
}: LabelProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <StyledLabel className={className} htmlFor={forId} isMobile={isMobile}>
            {children}
            {tooltipLabel && <StyledTooltip label={tooltipLabel} />}
        </StyledLabel>
    );
}

export { Label };
