import React, { ReactElement } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Avatar } from '../avatar/avatar';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { DropdownMenuButton } from '../dropdown-menu-button/dropdown-menu-button';
import { GroupItem, LabelItem, NavItem, NavItemProps } from '../dropdown-menu/list-items';

const StyledDropdownMenuButton = styled(DropdownMenuButton)<{ isMobile: boolean }>`
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
    actions: NavItemProps[];
    username: string;
    userEmail?: string;
    usernamePrefix?: string;
}

export function UserProfile({
    ariaLabel,
    className,
    defaultOpen = false,
    id,
    actions,
    username,
    userEmail,
    usernamePrefix,
}: UserProfileProps): ReactElement {
    const { t } = useTranslation('user-profile');
    const { isMobile } = useDeviceContext();

    return (
        <StyledDropdownMenuButton
            ariaLabel={ariaLabel || t('ariaLabel')}
            className={className}
            defaultOpen={defaultOpen}
            hasCaret={!isMobile}
            id={id}
            icon={<StyledAvatar isMobile={isMobile} username={username} />}
            isMobile={isMobile}
            {...(isMobile ? {} : {
                label: username,
                prefix: usernamePrefix,
            })}
        >
            <GroupItem id="user-label">
                <LabelItem label={username} description={userEmail} />
            </GroupItem>
            <GroupItem id="user-actions">
                {actions.map((action) => (
                    <NavItem id={action.id} value={action.value} to={action.to} label={action.label} />
                ))}
            </GroupItem>
        </StyledDropdownMenuButton>
    );
}
