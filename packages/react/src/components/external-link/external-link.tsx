import { type FC, MouseEvent, useCallback } from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconName } from '../icon';
import { StyledLink } from '../route-link/styles';
import { ScreenReaderOnlyText } from '../screen-reader-only-text';

const LeftIcon = styled(Icon)`
    align-self: center;
    margin-right: var(--spacing-quarter);
`;

const ExternalIcon = styled(Icon)`
    align-self: center;
    flex-shrink: 0;
    height: 1rem;
    margin-left: var(--spacing-half);
    margin-right: 0;
    width: 1rem;
`;

const Link = styled(StyledLink)`
    align-items: baseline;
    display: inline-flex;

    &:visited {
        svg {
            color: ${({ theme }) => theme.component['external-link-visited-text-color']};
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

    onClick?(event: MouseEvent<Element, globalThis.MouseEvent>): void;
}

/**
 * @deprecated This component is deprecated and will be removed in future releases. Use Link instead.
 */
export const ExternalLink: FC<ExternalLinkProps> = ({
    className,
    disabled,
    href = '',
    iconName,
    label,
    onClick,
    target = '_blank',
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('common');
    const opensInNewTab = target === '_blank';
    const handleClick: (event: MouseEvent<HTMLAnchorElement>) => void = useCallback((event) => {
        if (!href) {
            event.preventDefault();
        }
        onClick?.(event);
    }, [href, onClick]);

    return (
        <Link
            aria-disabled={disabled ? 'true' : 'false'}
            className={className}
            disabled={disabled}
            $hasLabel={!!label}
            href={disabled ? undefined : href}
            $isMobile={isMobile}
            onClick={disabled ? undefined : handleClick}
            target={target}
        >
            {iconName && <LeftIcon aria-hidden="true" name={iconName} size="16" />}
            <StyledLabel>{label}</StyledLabel>
            <ExternalIcon aria-label={t('opensInNewTab')} name="externalLink" role="img" size="16" />
            {opensInNewTab && (
                <ScreenReaderOnlyText data-testid="screen-reader-text" label={t('opensInNewTabScreenReader')} />
            )}
        </Link>
    );
};

ExternalLink.displayName = 'ExternalLink';
