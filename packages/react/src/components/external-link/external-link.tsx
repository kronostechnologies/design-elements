import { MouseEvent, ReactElement, useCallback } from 'react';
import styled from 'styled-components';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { StyledLink } from '../route-link/styles/styled-link';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { useTranslation } from '../../i18n/use-translation';

const LeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

const ExternalIcon = styled(Icon)`
    align-self: center;
    flex-shrink: 0;
    margin-left: var(--spacing-half);
    margin-right: 0;
`;

const Link = styled(StyledLink)<{isMobile: boolean}>`
    color: ${({ disabled, theme }) => (disabled ? theme.main['primary-1.2'] : theme.main['primary-1.1'])};
    display: flex;
    font-size: ${({ isMobile }) => (isMobile ? '1rem' : '0.875rem')};

    &:hover {
        ${({ disabled, theme }) => (disabled ? '' : `color: ${theme.main['primary-1.3']};`)}
    }

    &:visited {
        color: #62a; /* TODO change colors when updating thematization */

        svg {
            color: #62a; /* TODO change colors when updating thematization */
        }
    }
`;

const StyledLabel = styled.span`
    display: block;
    overflow: hidden;
    text-overflow: ellipsis;
`;

export interface ExternalLinkProps {
    className?: string;
    disabled?: boolean;
    href?: string;
    iconName?: IconName;
    label?: string;
    target?: string;

    onClick?(): void;
}

export function ExternalLink({
    className, disabled, href = '', iconName, label, onClick, target = '_blank',
}: ExternalLinkProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('common');
    const opensInNewTab = target === '_blank';
    const handleClick: (event: MouseEvent<HTMLAnchorElement>) => void = useCallback((event) => {
        if (!href) {
            event.preventDefault();
        }
        onClick?.();
    }, [href, onClick]);

    return (
        <Link
            aria-disabled={disabled ? 'true' : 'false'}
            className={className}
            disabled={disabled}
            $hasLabel={!!label}
            href={disabled ? undefined : href}
            isMobile={isMobile}
            onClick={disabled ? undefined : handleClick}
            target={target}
            type="external"
        >
            {iconName && <LeftIcon aria-hidden="true" name={iconName} size="16" />}
            <StyledLabel>{label}</StyledLabel>
            <ExternalIcon aria-label={t('opensInNewTab')} name="externalLink" role="img" size="16" />
            {opensInNewTab && (
                <ScreenReaderOnlyText data-testid="screen-reader-text" label={t('opensInNewTabScreenReader')} />
            )}
        </Link>
    );
}
