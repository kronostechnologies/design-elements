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
    button,
    children,
    disabled = false,
    external = false,
    href = '#',
    icon,
    id: providedId,
    target = '_blank',
    onClick,
    routerLink,
    rel = 'noopener noreferrer',
    ...linkProps
}): ReactElement => {
    const id = useId(providedId);
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('common');
    const opensInNewTab = external && target === '_blank';
    const isIconOnly = icon && !children;

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
            aria-label={isIconOnly ? icon.label : undefined}
            id={id}
            href={disabled ? undefined : href}
            onClick={handleClick}
            target={external ? target : undefined}
            tabIndex={disabled ? -1 : 0}
            rel={external ? rel : undefined}
            $buttonProps={button}
            $isMobile={isMobile}
            $disabled={disabled}
            {...linkProps /* eslint-disable-line react/jsx-props-no-spreading */}
        >
            {icon?.name && (
                <Icon
                    data-testid="link-icon"
                    aria-hidden="true"
                    name={icon.name}
                    size="16"
                />
            )}
            {!isIconOnly && children}
            {external && (
                <Icon
                    data-testid="external-link-icon"
                    aria-hidden="true"
                    focusable={false}
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
            label={icon.label}
        >
            {renderLink()}
        </Tooltip>
    ) : renderLink();
};

Link.displayName = 'Link';
