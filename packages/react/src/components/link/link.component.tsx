import { FC, ReactElement, MouseEvent } from 'react';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { ScreenReaderOnlyText } from '../screen-reader-only-text/ScreenReaderOnlyText';
import { Tooltip } from '../tooltip/tooltip';
import { StyledLink } from './styled';
import { LinkProps } from './types';

export const Link: FC<LinkProps> = ({
    buttonProps,
    children,
    disabled = false,
    external = false,
    href = '#',
    iconName,
    iconOnly = false,
    id: providedId,
    label,
    target = '_blank',
    onClick,
    routerLink,
    rel = 'noopener noreferrer',
    ...linkProps
}): ReactElement => {
    const id = useId(providedId);
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('common');
    const opensInNewTab = target === '_blank';
    const isIconOnly = iconOnly && (iconName || external);

    const handleClick = (event: MouseEvent<HTMLAnchorElement>): void => {
        if (disabled) {
            event.preventDefault();
            event.stopPropagation();
        } else {
            onClick?.(event);
        }
    };

    const renderLink = (): ReactElement => (
        <StyledLink
            as={external ? 'a' : routerLink}
            to={external ? undefined : href}
            data-testid="link"
            aria-disabled={disabled ? 'true' : 'false'}
            id={id}
            href={disabled ? undefined : href}
            onClick={handleClick}
            target={external ? target : undefined}
            tabIndex={disabled ? -1 : 0}
            rel={external ? rel : undefined}
            $buttonProps={buttonProps}
            $isMobile={isMobile}
            $disabled={disabled}
            {...linkProps /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {iconName && (
                <Icon
                    data-testid="link-icon"
                    aria-hidden="true"
                    name={iconName}
                    size="16"
                />
            )}
            {!isIconOnly && (label ?? children)}
            {external && (
                <Icon
                    data-testid="external-link-icon"
                    aria-label={t('opensInNewTab')}
                    name="externalLink"
                    role="img"
                    size="16"
                />
            )}
            {opensInNewTab && (
                <ScreenReaderOnlyText
                    data-testid="screen-reader-text"
                    label={t('opensInNewTabScreenReader')}
                />
            )}
        </StyledLink>
    );

    return isIconOnly ? (
        <Tooltip
            aria-describedby={`${id}-tooltip`}
            label={label ?? href}
        >
            {renderLink()}
        </Tooltip>
    ) : renderLink();
};

Link.displayName = 'Link';
