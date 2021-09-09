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

const Prefix = styled.span`
    color: ${({ theme }) => theme.greys['mid-grey']};
    font-size: 0.875rem;
    margin-right: var(--spacing-1x);
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
    usernamePrefix?: string;
    options: NavMenuOption[];
}

export function UserProfile({
    ariaLabel,
    className,
    defaultOpen = false,
    id,
    options,
    username,
    usernamePrefix,
}: UserProfileProps): ReactElement {
    const { t } = useTranslation('user-profile');
    const { isMobile } = useDeviceContext();

    return (
        <StyledNavMenuButton
            ariaLabel={ariaLabel || t('ariaLabel')}
            className={className}
            defaultOpen={defaultOpen}
            hasCaret={!isMobile}
            id={id}
            isMobile={isMobile}
            options={options}
        >
            <StyledAvatar isMobile={isMobile} username={username} />
            {usernamePrefix && <Prefix data-testid="username-prefix">{usernamePrefix}</Prefix>}
            {!isMobile && username}
        </StyledNavMenuButton>
    );
}
