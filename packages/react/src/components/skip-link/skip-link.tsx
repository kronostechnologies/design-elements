import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledLink = styled(AbstractButton).attrs({ as: 'a' })<{ href: string }>`
    &:not(:focus) {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        overflow: hidden;
        position: absolute;
        white-space: nowrap;
        width: 1px;
    }

    &:focus {
        background-color: ${({ theme }) => theme.greys.white};
        color: ${({ theme }) => theme.main['primary-1.1']};
        font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
        font-weight: var(--font-normal);
        letter-spacing: 0.015rem;
        position: absolute;
        text-transform: unset;
    }
`;

interface SkipLinkProps {
    children: ReactNode;
    className?: string;
    href: string;
}

export function SkipLink({ children, className, href }: SkipLinkProps): ReactElement {
    const { isMobile } = useDeviceContext();

    return <StyledLink className={className} href={href} isMobile={isMobile}>{children}</StyledLink>;
}
