import { Fragment, ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Tooltip, TooltipProps } from '../tooltip/tooltip';

const StyledDiv = styled.div`
    align-items: center;
    display: flex;
`;

const StyledLabel = styled.label<{isMobile: boolean}>`
    color: ${(props) => props.theme.greys.black};
    display: block;
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
    tooltip?: TooltipProps;
}

function Label({
    className, children, forId, tooltip,
}: LabelProps): ReactElement {
    const WrapperComponent = tooltip ? StyledDiv : Fragment;
    const { isMobile } = useDeviceContext();

    return (
        <WrapperComponent>
            <StyledLabel className={className} htmlFor={forId} isMobile={isMobile}>
                {children}
            </StyledLabel>
            {/* eslint-disable-next-line react/jsx-props-no-spreading */}
            {tooltip && <StyledTooltip {...tooltip} />}
        </WrapperComponent>
    );
}

export { Label };
