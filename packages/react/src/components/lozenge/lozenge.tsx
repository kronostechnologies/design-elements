import React, { FunctionComponent } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const MAXIMUM_LENGTH = '312px';

const StyledLozenge = styled.span<{ isMobile: boolean }>`
    align-items: center;
    background-color: ${({ theme }) => theme.greys['light-grey']};
    border: 1px solid #878f9a;
    border-radius: ${({ isMobile }) => (isMobile ? 'var(--border-radius)' : 'var(--border-radius-half)')};
    box-sizing: border-box;
    display: inline-block;
    font-size: ${({ isMobile }) => (isMobile ? '0.875rem' : '0.75rem')};
    line-height: ${({ isMobile }) => (isMobile ? '1.375rem' : '0.875rem')};
    max-width: ${MAXIMUM_LENGTH};
    overflow: hidden;
    padding: 0 var(--spacing-half);
    text-overflow: ellipsis;
    text-transform: uppercase;
    white-space: nowrap;
`;

export const Lozenge: FunctionComponent = ({
    children,
}) => {
    const { isMobile } = useDeviceContext();
    return <StyledLozenge isMobile={isMobile}>{children}</StyledLozenge>;
};
