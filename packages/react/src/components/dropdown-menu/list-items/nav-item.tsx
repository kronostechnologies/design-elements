import React, { ReactElement } from 'react';
import styled from 'styled-components';
import { NavLink, NavLinkProps } from 'react-router-dom';
import { DeviceContextProps, useDeviceContext } from '../../device-context-provider/device-context-provider';
import { IconName } from '../../icon/icon';
import { ItemContent } from './item-content';

export interface NavItemProps extends NavLinkProps {
    id: string;
    value: string;
    description?: string;
    iconName?: IconName;
    label?: string;
}

interface NavItemStyledProps extends NavItemProps {
    $device: DeviceContextProps;
}

export const StyledNavItem = styled(NavLink)<NavItemStyledProps>`
    color: ${({ theme }) => theme.greys.black};
    display: block;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    height: 2.5rem;
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-decoration: none;
    white-space: nowrap;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

export const NavItem = ({
    id,
    to,
    value,
    description,
    exact,
    iconName,
    label,
}: NavItemProps): ReactElement => {
    const device = useDeviceContext();
    return (
        <li key={id}>
            <StyledNavItem
                id={id}
                to={to}
                value={value}
                $device={device}
                data-testid={`listitem-${value}`}
                exact={exact}
            >
                <ItemContent
                    device={device}
                    label={label || value}
                    description={description}
                    iconName={iconName}
                />
            </StyledNavItem>
        </li>
    );
};
