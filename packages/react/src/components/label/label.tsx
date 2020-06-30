import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledLabel = styled.label<{isMobile: boolean}>`
    color: ${props => props.theme.greys.black};
    display: block;
    font-size: ${({ isMobile }) => isMobile ? '0.875rem' : '0.75rem'};
    font-weight: var(--font-normal);
    letter-spacing: 0.02rem;
    line-height: ${({ isMobile }) => isMobile ? '1.5rem' : '1.25rem'};
    margin: 0;
    width: fit-content;

    input + & {
        margin-left: var(--spacing-half);
    }
`;

interface LabelProps {
    children: ReactNode;
    forId: string;
}

function Label({ children, forId }: LabelProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return (
        <StyledLabel htmlFor={forId} isMobile={isMobile}>
            {children}
        </StyledLabel>
    );
};

export { Label };
