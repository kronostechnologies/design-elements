import { useRef, VoidFunctionComponent } from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { Avatar } from '../avatar';
import { useDeviceContext } from '../device-context-provider';
import { DropdownMenuButton } from '../dropdown-menu-button';
import { GroupItem, LabelItem, NavItem, type NavItemProps } from '../dropdown-menu/list-items';

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

export function getFirstFocusableItem(options: NavItemProps[]): NavItemProps | undefined {
    return options.find((opt) => !opt.disabled);
}

export interface UserProfileProps {
    /**
     * Sets nav's description
     * @default 'User menu'
     * */
    ariaLabel?: string;
    buttonAriaLabel?: string;
    className?: string;
    /**
     * Sets menu open by default
     * @default false
     * */
    defaultOpen?: boolean;
    id?: string;
    inverted?: boolean;
    /** Set wrapper element tag */
    tag?: 'div' | 'nav';
    options: NavItemProps[];
    username: string;
    userEmail?: string;
    onMenuVisibilityChanged?(isOpen: boolean): void;
}

export const UserProfile: VoidFunctionComponent<UserProfileProps> = ({
    ariaLabel,
    buttonAriaLabel,
    className,
    defaultOpen = false,
    id,
    inverted = true,
    tag,
    onMenuVisibilityChanged,
    options,
    userEmail,
    username,
}) => {
    const { t } = useTranslation('user-profile');
    const { isMobile } = useDeviceContext();
    const firstFocusableItem = getFirstFocusableItem(options);
    const firstItemRef = useRef<HTMLAnchorElement>(null);

    return (
        <StyledDropdownMenuButton
            ariaLabel={ariaLabel || t('ariaLabel')}
            buttonAriaLabel={buttonAriaLabel}
            className={className}
            data-testid="user-profile"
            defaultOpen={defaultOpen}
            hasCaret={!isMobile}
            id={id}
            icon={<StyledAvatar isMobile={isMobile} username={username} />}
            inverted={inverted}
            tag={tag}
            isMobile={isMobile}
            // eslint-disable-next-line react/jsx-props-no-spreading
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
                        {options.map((action) => (
                            <NavItem
                                data-testid={`action-${action.value}`}
                                ref={firstFocusableItem === action ? firstItemRef : undefined}
                                key={action.value}
                                value={action.value}
                                href={action.href}
                                label={action.label}
                                isHtmlLink={action.isHtmlLink}
                                isExternalLink={action.isExternalLink}
                                lozenge={action.lozenge}
                                disabled={action.disabled}
                                target={action.target}
                                onClick={action.disabled ? undefined : (event) => {
                                    action.onClick?.(event);
                                    close();
                                }}
                            />
                        ))}
                    </GroupItem>
                </>
            )}
        />
    );
};
