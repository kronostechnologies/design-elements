import { useMemo, VoidFunctionComponent } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { ResolvedTheme } from '../../themes/theme';
import { getInitialsFromUsername } from '../../utils/user';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';

export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large'

export interface AvatarProps {
    className?: string;
    username?: string;
    bgColor?: string;
    imgSrc?: string;
    size?: AvatarSize;
}

interface SizeStyleProps {
    size: AvatarSize;
    isMobile: boolean;
}

function getSpecificSizeStyle({ size, isMobile }: SizeStyleProps): FlattenInterpolation<ThemeProps<ResolvedTheme>> {
    switch (size) {
        case 'xsmall':
            return css`
                font-size: ${(isMobile ? '0.75' : '0.625')}rem;
                height: ${(isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
                letter-spacing: ${(isMobile ? '0.013' : '0.011')}rem;
                width: ${(isMobile ? 'var(--size-2x)' : 'var(--size-1halfx)')};
            `;
        case 'small':
            return css`
                font-size: ${(isMobile ? '0.875' : '0.75')}rem;
                height: ${(isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
                letter-spacing: ${(isMobile ? '0.014' : '0.013')}rem;
                width: ${(isMobile ? 'var(--size-2halfx)' : 'var(--size-2x)')};
            `;
        case 'medium':
            return css`
                font-size: 1rem;
                height: var(--size-3x);
                width: var(--size-3x);
            `;
        case 'large':
            return css`
                font-size: 1.5rem;
                height: ${(isMobile ? 'var(--size-4halfx)' : 'var(--size-5x)')};
                width: ${(isMobile ? 'var(--size-4halfx)' : 'var(--size-5x)')};
            `;
    }
}

interface StyledDivProps extends SizeStyleProps {
    bgColor?: string;
}

const StyledDiv = styled.div<StyledDivProps>`
    align-items: center;
    background: ${({ bgColor, theme }) => bgColor ?? theme.component['avatar-background-color']};
    border-radius: 50%;
    color: ${({ theme }) => theme.component['avatar-text-color']};
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

export const Avatar: VoidFunctionComponent<AvatarProps> = ({
    className, username, bgColor, imgSrc, size = 'xsmall',
}) => {
    const { t } = useTranslation('avatar');
    const { isMobile } = useDeviceContext();
    const initials = useMemo(() => {
        if (username === undefined) {
            return '';
        }

        return getInitialsFromUsername(username);
    }, [username]);
    const ariaLabel = useMemo(() => t('ariaLabel', { username }), [username, t]);
    const hasInitials = initials.length <= 2 && initials.length > 0;

    return imgSrc ? (
        <StyledImg src={imgSrc} alt={ariaLabel} className={className} size={size} isMobile={isMobile} />
    ) : (
        <StyledDiv
            role="img"
            aria-label={ariaLabel}
            className={className}
            bgColor={bgColor}
            size={size}
            isMobile={isMobile}
        >
            <span data-testid="avatar-initials">
                {hasInitials ? initials : <Icon name="user" size={isMobile ? '24' : '16'} />}
            </span>
        </StyledDiv>
    );
};

Avatar.displayName = 'Avatar';
