import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledLi = styled.li<{ isMobile: boolean; }>`
    align-items: center;
    background-color: ${({ theme }) => theme.greys['light-grey']};

    /* TODO fix with next thematization gray50 */
    border: 1px solid #878f9a;
    border-radius: ${({ isMobile }) => (isMobile ? 'var(--border-radius)' : '2px')};
    box-sizing: border-box;
    display: flex;
    flex-wrap: nowrap;
    font-size: ${({ isMobile }) => (isMobile ? 0.875 : 0.75)}rem;
    line-height: ${({ isMobile }) => (isMobile ? 1.375 : 0.875)}rem;
    padding: 0 ${({ isMobile }) => (isMobile ? 'var(--spacing-1x)' : 'var(--spacing-half)')};

    & + & {
        margin-left: var(--spacing-1x);
    }
`;

interface TagSmallProps {
    label: string;
}

export function TagSmall({ label }: TagSmallProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return <StyledLi isMobile={isMobile} key={label}>{label}</StyledLi>;
}
