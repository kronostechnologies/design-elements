import React, { ReactElement, ReactNode } from 'react';
import styled from 'styled-components';
import { AbstractButton } from '../buttons/abstract-button';

const StyledLink = styled(AbstractButton).attrs({ as: 'a' })<{ href: string }>`
    background-color: ${({ theme }) => theme.greys.white};
    clip: rect(1px, 1px, 1px, 1px);

    /* TODO Fix with new thematization */
    color: #006296;
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    height: 1px;
    letter-spacing: 0.015rem;
    overflow: hidden;
    position: absolute;
    text-transform: unset;
    white-space: nowrap;
    width: 1px;

    &:focus {
        clip: auto;
        height: auto;
        overflow: auto;
        position: absolute;
        width: auto;
    }
`;

interface SkipLinkProps {
    children: ReactNode;
    className?: string;
    href: string;
}

export function SkipLink({ children, className, href }: SkipLinkProps): ReactElement {
    return <StyledLink className={className} href={href} isMobile={false}>{children}</StyledLink>;
}
