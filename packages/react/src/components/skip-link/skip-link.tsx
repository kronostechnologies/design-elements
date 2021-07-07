import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledLink = styled(AbstractButton).attrs({ as: 'a' })<{ href: string }>`
    color: ${({ theme }) => theme.main['primary-1.1']};
    font-size: ${({ isMobile }) => (isMobile ? 1 : 0.875)}rem;
    font-weight: var(--font-normal);
    letter-spacing: 0.015rem;
    overflow: hidden;
    position: absolute;
    text-transform: unset;
    white-space: nowrap;

    &:not(:focus) {
        clip: rect(1px, 1px, 1px, 1px);
        height: 1px;
        width: 1px;
    }

    &:focus {
        background-color: ${({ theme }) => theme.greys.white};
        position: absolute;
    }
`;

interface SkipLinkProps {
    className?: string;
    href: string;
}

export function SkipLink({ className, href }: SkipLinkProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('skip-link');

    return <StyledLink className={className} href={href} isMobile={isMobile}>{t('label')}</StyledLink>;
}
