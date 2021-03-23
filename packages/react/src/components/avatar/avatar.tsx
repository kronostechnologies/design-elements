import React, { ReactElement, useMemo } from 'react';
import styled, { css, FlattenInterpolation, ThemeProps } from 'styled-components';
import { Theme } from '../../themes';
import { getInitialsFromUsername } from '../../utils/user';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { useTranslation } from '../../i18n/use-translation';
import { Icon } from '../icon/icon';

export type AvatarSize = 'xsmall' | 'small' | 'medium' | 'large'

interface AvatarProps {
    className?: string;
    username?: string;
    bgColor?: string;
    imgSrc?: string;
    size?: AvatarSize;
}

interface SizeStyleProps {
    size: AvatarSize;
    isMobile: boolean
}

function getSpecificSizeStyle({ size, isMobile }: SizeStyleProps): FlattenInterpolation<ThemeProps<Theme>> {
    switch (size) {
        case 'xsmall':
            return css`
                font-size: ${(isMobile ? '0.75' : '0.625')}rem;
                height: ${(isMobile ? '32' : '24')}px;
                letter-spacing: ${(isMobile ? '0.013' : '0.011')}rem;
                width: ${(isMobile ? '32' : '24')}px;`;
        case 'small':
            return css`
                font-size: ${(isMobile ? '0.875' : '0.75')}rem;
                height: ${(isMobile ? '40' : '32')}px;
                letter-spacing: ${(isMobile ? '0.014' : '0.013')}rem;
                width: ${(isMobile ? '40' : '32')}px;`;
        case 'medium':
            return css`
                font-size: 1rem;
                height: 48px;
                width: 48px;`;
        case 'large':
            return css`
                font-size: 1.5rem;
                height: ${(isMobile ? '72' : '80')}px;
                width: ${(isMobile ? '72' : '80')}px;`;
    }
}

interface StyledDivProps extends SizeStyleProps {
    bgColor?: string;
}

const StyledDiv = styled.div<StyledDivProps>`
    align-items: center;
    background: ${({ bgColor, theme }) => bgColor ?? theme.greys['light-grey']};
    border-radius: 50%;
    color: ${({ theme }) => theme.greys['dark-grey']};
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

export function Avatar({
    className, username, bgColor, imgSrc, size = 'xsmall',
}: AvatarProps): ReactElement {
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
}
