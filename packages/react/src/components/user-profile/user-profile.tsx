/* eslint-disable react/jsx-props-no-spreading */
import React, { ReactElement, useRef } from 'react';
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
    options: NavItemProps[];
    username: string;
    userEmail?: string;
    onMenuVisibilityChanged?(isOpen: boolean): void;
}

export function UserProfile({
    ariaLabel,
    className,
    defaultOpen = false,
    id,
    options,
    username,
    userEmail,
    onMenuVisibilityChanged,
}: UserProfileProps): ReactElement {
    const { t } = useTranslation('user-profile');
    const { isMobile } = useDeviceContext();
    const firstItemRef = useRef<HTMLAnchorElement>(null);
    return (
        <StyledDropdownMenuButton
            ariaLabel={ariaLabel || t('ariaLabel')}
            className={className}
            data-testid="user-profile"
            defaultOpen={defaultOpen}
            hasCaret={!isMobile}
            id={id}
            icon={<StyledAvatar isMobile={isMobile} username={username} />}
            isMobile={isMobile}
            {...(isMobile ? {} : {
                label: username,
            })}
            onMenuVisibilityChanged={onMenuVisibilityChanged}
            firstItemRef={firstItemRef}
            render={(close) => (
                <>
                    <GroupItem id="user-label">
                        <LabelItem label={username} description={userEmail} />
                    </GroupItem>
                    <GroupItem id="user-actions">
                        {options.map((action, idx) => (
                            <NavItem
                                ref={idx === 0 ? firstItemRef : undefined}
                                key={action.value}
                                value={action.value}
                                href={action.href}
                                label={action.label}
                                isHtmlLink={action.isHtmlLink}
                                disabled={action.disabled}
                                onClick={close}
                            />
                        ))}
                    </GroupItem>
                </>
            )}
        />
    );
}
