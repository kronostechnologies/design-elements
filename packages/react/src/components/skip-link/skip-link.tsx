import { MouseEvent, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { defaultButtonStyles } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';

const StyledLink = styled.a<{ isMobile: boolean }>`
    ${defaultButtonStyles}

    color: ${({ theme }) => theme.colors['primary-1.1']};
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
        background-color: ${({ theme }) => theme.colors.white};
        position: absolute;
    }
`;

export interface SkipLinkProps {
    className?: string;
    href: string;
    onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}

export const SkipLink: VoidFunctionComponent<SkipLinkProps> = ({
    className, href, onClick,
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('skip-link');

    return (
        <StyledLink
            className={className}
            href={href}
            isMobile={isMobile}
            onClick={onClick}
        >
            {t('label')}
        </StyledLink>
    );
};
