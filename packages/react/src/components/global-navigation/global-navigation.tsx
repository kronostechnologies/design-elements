import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';

import { IconButton } from '../buttons/icon-button';
import { Icon, IconName } from '../icon/icon';
import { RouterLinkProps } from '../route-link/route-link';

const Wrapper = styled.div<{padding: number}>`
    background-color: ${({ theme }) => theme.greys.white};
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: ${({ padding }) => padding}px 0;
    width: 56px;
`;

const Nav = styled.ul<{ itemsVisible?: number }>`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

const ShowMoreMenu = styled.div`
    background-color: ${props => props.theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    display: none;
    flex-wrap: wrap;
    left: 50px;
    overflow: hidden;
    position: absolute;
    top: 0;
`;

const ShowMoreButton = styled(IconButton)`
    &:hover {
        background-color: ${props => props.theme.greys.grey};
        color: ${props => props.theme.greys['dark-grey']};
        cursor: default;
    }
`;

export const NavigationItem = styled.li`
    align-items: center;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: var(--spacing-1x) 0;
    position: relative;

    &.moreMenu:hover {
        ${ShowMoreMenu} {
            display: flex;
        }

        ${ShowMoreButton} {
            background-color: ${props => props.theme.greys.grey};
            color: ${props => props.theme.greys['dark-grey']};
        }
    }
`;

const IconLink = styled.a<NavLinkProps>`
    align-items: center;
    border-radius: 16px;
    color: ${({ theme }) => theme.greys['dark-grey']};
    display: flex;
    height: 32px;
    justify-content: center;
    width: 32px;

    &:hover {
        background-color: ${props => props.theme.greys.grey};
        color: ${props => props.theme.greys['dark-grey']};
    }

    &:focus,
    &.active {
        background-color: ${props => props.theme.main['primary-1.1']};
        color: ${props => props.theme.greys.white} !important;

        &:hover {
            background-color: ${props => props.theme.main['primary-1.1']};
            color: ${props => props.theme.greys.white};
        }
    }
`;

const MenuLink = styled.a<NavLinkProps>`
    color: ${({ theme }) => theme.greys.black};
    display: flex;
    flex-grow: 1;
    line-height: 24px;
    padding: var(--spacing-half) var(--spacing-2x);
    text-decoration: none;
    width: max-content;

    &:hover {
        background-color: ${props => props.theme.greys.grey};
    }

    &.active {
        font-weight: var(--font-bold);
    }
`;

export interface GlobalNavigationItem {
    exact?: boolean;
    href: string;
    iconName: IconName;
    name: string;
}

interface GlobalNavigationProps {
    /** Item has an icon name, a name, and a href */
    mainItems: GlobalNavigationItem[];
    /** Item has an icon name, a name, and a href */
    footerItems: GlobalNavigationItem[];
    /** Takes Link or NavLink from react-router-dom */
    routerLink: RouterLinkProps;
}

export const GlobalNavigation = ({
    mainItems,
    footerItems,
    routerLink,
}: GlobalNavigationProps): ReactElement => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [navItems, setNavItems] = useState(mainItems);
    const [moreItems, setMoreItems] = useState<GlobalNavigationItem[]>();
    const [overflow, setOverflow] = useState(false);
    const [moreMenu, setMoreMenu] = useState(false);
    const itemHeight = 48;
    const wrapperPadding = 12;

    useEffect(() => {
        if (wrapperRef.current === null) return;
        const totalItemsHeight = (mainItems.length + footerItems.length) * itemHeight;
        const wrapperInnerHeight =  wrapperRef.current.clientHeight - (wrapperPadding * 2);
        if (totalItemsHeight >= wrapperInnerHeight) {
            const wrapperCapacity = Math.floor(wrapperInnerHeight / itemHeight);
            const visibleItems = wrapperCapacity - footerItems.length;
            setNavItems(mainItems.filter((_, index) => index < visibleItems - 1));
            setMoreItems(mainItems.filter((_, index) => index >= visibleItems - 1));
            setOverflow(true);
        } else {
            setNavItems(mainItems);
            setOverflow(false);
        }
    }, [mainItems, wrapperRef]);

    return (
        <Wrapper ref={wrapperRef} padding={wrapperPadding}>
            <nav>
                <Nav>
                    {navItems.map((item) => (
                        <NavigationItem key={`${item.name}-${item.iconName}`} title={item.name}>
                            <IconLink
                                as={routerLink}
                                aria-label={item.name}
                                exact={item.exact}
                                to={item.href}
                            >
                                <Icon name={item.iconName} size="16"/>
                            </IconLink>
                        </NavigationItem>
                    ))}
                    {overflow && (
                        <NavigationItem className="moreMenu" onMouseEnter={() => setMoreMenu(true)}>
                            <ShowMoreButton
                                aria-label="Show more navigation elements"
                                buttonType="tertiary"
                                iconName="moreVertical"
                                label="show more"
                            />
                            {moreMenu && (
                                <ShowMoreMenu onClick={() => setMoreMenu(false)}>
                                    {moreItems && moreItems.map((moreItem) => (
                                        <MenuLink
                                            as={routerLink}
                                            aria-label={moreItem.name}
                                            exact={moreItem.exact}
                                            key={`${moreItem.name}-${moreItem.iconName}`}
                                            to={moreItem.href}
                                        >
                                            {moreItem.name}
                                        </MenuLink>
                                    ))}
                                </ShowMoreMenu>
                            )}
                        </NavigationItem>
                    )}
                </Nav>
            </nav>
            <footer>
                <Nav>
                    {footerItems.map((item) => (
                        <NavigationItem key={`${item.name}-${item.iconName}`} title={item.name}>
                            <IconLink
                                as={routerLink}
                                aria-label={item.name}
                                exact={item.exact}
                                to={item.href}
                            >
                                <Icon name={item.iconName} size="16"/>
                            </IconLink>
                        </NavigationItem>
                    ))}
                </Nav>
            </footer>
        </Wrapper>
    );
};
