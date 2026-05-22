import { type FC, MouseEvent, ReactElement } from 'react';
import styled, { type SimpleInterpolation } from 'styled-components';
import { useId } from '../../hooks/use-id';
import { useTranslation } from '../../i18n/use-translation';
import type { ButtonProps } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconProps } from '../icon';
import { buttonTypesToDarkenEquisoftLogo, darkenOnComponentHover } from '../icon/equisoft-logo';
import { ScreenReaderOnlyText } from '../screen-reader-only-text';
import { Tooltip } from '../tooltip';
import { StyledLink } from './styled';
import { LinkProps } from './types';

interface LeftIconProps extends IconProps {
    $buttonType: ButtonProps['buttonType'] | undefined;
}

function getSideIconStyle({ $buttonType, name }: LeftIconProps): readonly SimpleInterpolation[] | null {
    if (name === 'equisoft' && [undefined, ...buttonTypesToDarkenEquisoftLogo].includes($buttonType)) {
        return darkenOnComponentHover(StyledLink);
    }
    return null;
}

const StyledLeftIcon = styled(Icon)<LeftIconProps>`${getSideIconStyle}`;

function getIconLabel(icon: LinkProps['icon']): string | undefined {
    if (icon !== undefined && 'label' in icon) {
        return icon.label;
    }

    return undefined;
}

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
    const iconLabel = getIconLabel(icon);

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
            aria-label={isIconOnly ? iconLabel : undefined}
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
                <StyledLeftIcon
                    data-testid="link-icon"
                    aria-hidden="true"
                    name={icon.name}
                    size="16"
                    $buttonType={button?.buttonType}
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

    return isIconOnly && iconLabel !== undefined ? (
        <Tooltip
            aria-describedby={`${id}-tooltip`}
            label={iconLabel}
        >
            {renderLink()}
        </Tooltip>
    ) : renderLink();
};

Link.displayName = 'Link';
