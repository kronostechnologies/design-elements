import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Avatar } from '../avatar/avatar';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { NavMenuButton } from '../nav-menu-button/nav-menu-button';
import { NavMenuOption } from '../nav-menu/nav-menu';

const StyledNavMenuButton = styled(NavMenuButton)<{ isMobile: boolean }>`
    button {
        ${({ isMobile }) => isMobile && css`
            height: fit-content;
            padding: 0;
        `}
    }
`;

const StyledAvatar = styled(Avatar)<{ isMobile: boolean }>`
    margin-right: ${({ isMobile }) => (isMobile ? 0 : 'var(--spacing-1x)')};
`;

interface UserProfileProps {
    /**
     * Sets nav's description
     * @default 'User menu'
     * */
    ariaLabel?: string;
    className?: string;
    /**
     * Sets menu open by default
     * @default false
     * */
    defaultOpen?: boolean;
    id?: string;
    username: string;
    options: NavMenuOption[];
}

export function UserProfile({
    ariaLabel,
    className,
    defaultOpen = false,
    id,
    options,
    username,
}: UserProfileProps): ReactElement {
    const { t } = useTranslation('user-profile');
    const { isMobile } = useDeviceContext();

    return (
        <StyledNavMenuButton
            ariaLabel={ariaLabel || t('ariaLabel')}
            className={className}
            defaultOpen={defaultOpen}
            hasIcon={!isMobile}
            id={id}
            isMobile={isMobile}
            options={options}
        >
            <StyledAvatar isMobile={isMobile} username={username} />
            {!isMobile && username}
        </StyledNavMenuButton>
    );
}
