import { type FC, useMemo } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { type ResolvedTheme } from '../../themes';
import { getInitialsFromUsername } from '../../utils/user';
import { useDeviceContext } from '../device-context-provider';
import { Icon, type IconName } from '../icon';
import { getAvatarColorsFromString } from './avatar.utils';
import { useTheme } from '../../hooks/use-theme';

export type AvatarSize = 'xxsmall' | 'xsmall' | 'small' | 'medium' | 'large' | 'xlarge'

interface SizeStyleProps {
    size: AvatarSize;
    isMobile: boolean;
}

function getSpecificSizeStyle({ size, isMobile }: SizeStyleProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    switch (size) {
        case 'xxsmall':
            return css`
                font-size: 0.375rem;
                height: var(--size-1x);
                letter-spacing: 0.00831rem;
                width: var(--size-1x);
            `;
        case 'xsmall':
            return css`
                font-size: 0.46875rem;
                height: 1.25rem;
                letter-spacing: 0.01044rem;
                width: 1.25rem;
            `;
        case 'small':
            return css`
                font-size: ${(isMobile ? '0.75' : '0.5625')}rem;
                height: ${(isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
                letter-spacing: 0.0125rem;
                width: ${(isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
            `;
        case 'medium':
            return css`
                font-size: ${(isMobile ? '1' : '0.75')}rem;
                height: ${(isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
                letter-spacing: 0.0125rem;
                width: ${(isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
            `;
        case 'large':
            return css`
                font-size: ${(isMobile ? '1.125' : '1')}rem;
                height: ${(isMobile ? 'var(--size-3halfx)' : 'var(--size-3x)')};
                letter-spacing: 0.0125rem;
                width: ${(isMobile ? 'var(--size-3halfx)' : 'var(--size-3x)')};
            `;
        case 'xlarge':
            return css`
                font-size: 1.5rem;
                height: ${(isMobile ? 'var(--size-4halfx)' : 'var(--size-5x)')};
                letter-spacing: 0.0125rem;
                width: ${(isMobile ? 'var(--size-4halfx)' : 'var(--size-5x)')};
            `;
    }
}

interface StyledDivProps extends SizeStyleProps {
    $bgColor?: string;
    $textColor?: string;
}

const StyledDiv = styled.div<StyledDivProps>`
    align-items: center;
    background: ${({ $bgColor, theme }) => $bgColor ?? theme.component['avatar-background-color']};
    border-radius: 50%;
    color: ${({ $textColor, theme }) => $textColor ?? theme.component['avatar-text-color']};
    display: flex;
    font-weight: var(--font-semi-bold);
    justify-content: center;
    text-transform: capitalize;
    ${getSpecificSizeStyle}
`;

const StyledImg = styled.img<SizeStyleProps>`
    border-radius: 50%;
    object-fit: cover;
    ${getSpecificSizeStyle}
`;

interface BaseAvatarProps {
    bgColor?: string;
    className?: string;
    size?: AvatarSize;
}

interface IconAvatar extends BaseAvatarProps {
    iconName: IconName;
    imgSrc?: never;
    username?: never;
}

interface UserAvatar extends BaseAvatarProps {
    iconName?: never;
    imgSrc?: string;
    username?: string;
}

export type AvatarProps = IconAvatar | UserAvatar;

export const Avatar: FC<AvatarProps> = ({
    bgColor,
    className,
    iconName,
    imgSrc,
    username,
    size = 'small',
}) => {
    const { t } = useTranslation('avatar');
    const { isMobile } = useDeviceContext();
    const theme = useTheme();

    const { backgroundColor: generatedBg, textColor: generatedText } = useMemo(
        () => getAvatarColorsFromString(theme, username),
        [theme, username],
    );

    const resolvedBg = bgColor ?? generatedBg;
    const resolvedText = bgColor ? undefined : generatedText;

    const initials = useMemo(() => {
        if (username === undefined) {
            return '';
        }

        return getInitialsFromUsername(username);
    }, [username]);
    const ariaLabel = useMemo(() => t('ariaLabel', { username }), [username, t]);
    const hasInitials = initials.length <= 2 && initials.length > 0;

    if (imgSrc) {
        return <StyledImg src={imgSrc} alt={ariaLabel} className={className} size={size} isMobile={isMobile} />;
    }

    return (
        <StyledDiv
            role="img"
            aria-label={ariaLabel}
            className={className}
            $bgColor={resolvedBg}
            $textColor={resolvedText}
            size={size}
            isMobile={isMobile}
        >
            {iconName ? (
                <Icon name={iconName} />
            ) : (
                <span data-testid="avatar-initials">
                    {hasInitials ? initials : <Icon name="user" size={isMobile ? '24' : '16'} />}
                </span>
            )}
        </StyledDiv>
    );
};

Avatar.displayName = 'Avatar';
