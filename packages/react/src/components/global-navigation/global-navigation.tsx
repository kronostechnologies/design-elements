import React, { ReactElement, useEffect, useRef, useState } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { Icon, IconName } from '../icon/icon';

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

const ShowMoreMenu = styled.div<{open?: boolean}>`
    background-color: ${props => props.theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    display: ${({ open }) => open ? 'flex' : 'none'};
    flex-wrap: wrap;
    left: 48px;
    position: absolute;
    top: 0;

    & > :first-child {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    & > :last-child {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
`;

const ShowMore = styled.button<{active?: boolean}>`
    align-items: center;
    background-color: ${({ active, theme }) => active ? theme.greys.grey : 'transparent'};
    border: none;
    border-radius: 16px;
    color: ${({ theme }) => theme.greys['dark-grey']};
    cursor: pointer;
    display: flex;
    height: 32px;
    justify-content: center;
    width: 32px;

    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
        outline: none;
    }

    &:hover {
        background-color: ${props => props.theme.greys.grey};
        color: ${props => props.theme.greys['dark-grey']};
    }
`;

const NavigationItem = styled.li`
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

        ${ShowMore} {
            background-color: ${props => props.theme.greys.grey};
            color: ${props => props.theme.greys['dark-grey']};
        }
    }
`;

const IconLink = styled(ShowMore).attrs({ as: NavLink })<NavLinkProps>`
    &.active {
        background-color: ${props => props.theme.main['primary-1.1']};
        color: ${props => props.theme.greys.white} !important;

        &:hover {
            background-color: ${props => props.theme.main['primary-1.1']};
            color: ${props => props.theme.greys.white};
        }
    }

    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
        outline: none;
    }
`;

const MenuLink = styled(NavLink)`
    color: ${({ theme }) => theme.greys.black};
    display: flex;
    flex-grow: 1;
    line-height: 24px;
    padding: var(--spacing-half) var(--spacing-2x);
    text-decoration: none;
    width: max-content;

    &:focus {
        box-shadow: 0 0 0 2px rgba(0, 128, 165, 0.4);
        outline: none;
    }

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
}

export const GlobalNavigation = ({
    mainItems,
    footerItems,
}: GlobalNavigationProps): ReactElement => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [navItems, setNavItems] = useState(mainItems);
    const [moreItems, setMoreItems] = useState<GlobalNavigationItem[]>();
    const [overflow, setOverflow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const itemHeight = 48;
    const wrapperPadding = 12;

    useEffect(() => {
        if (overflow) {
            if (wrapperRef.current === null) return;
            document.addEventListener('mouseup', handleClickOutside);
            return () => document.removeEventListener('mouseup', handleClickOutside);
        }
        return;
    }, [overflow, menuOpen]);

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

    const handleClickOutside = (event: MouseEvent): void => {
        const shouldClose =
            wrapperRef.current === null ||
            wrapperRef.current && !wrapperRef.current.contains(event.target as Node);
        if (shouldClose && menuOpen) {
            setMenuOpen(false);
        }
    };

    const navItem = (item: GlobalNavigationItem): ReactElement => (
        <NavigationItem key={`${item.name}-${item.iconName}`} title={item.name}>
            <IconLink
                aria-label={item.name}
                exact={item.exact}
                to={item.href}
                onClick={() => setMenuOpen(false)}
            >
                <Icon name={item.iconName} size="16"/>
            </IconLink>
        </NavigationItem>
    );

    return (
        <Wrapper ref={wrapperRef} padding={wrapperPadding}>
            <nav aria-label="App Navigation">
                <Nav>
                    {navItems.map(navItem)}
                    {overflow && (
                        <NavigationItem className="moreMenu">
                            <ShowMore
                                active={menuOpen}
                                aria-label="Show more navigation elements"
                                aria-pressed={menuOpen}
                                type="button"
                                data-testid="showMoreIcon"
                                onClick={() => setMenuOpen(!menuOpen)}
                            >
                                <Icon name="moreVertical" size="16"/>
                            </ShowMore>
                            <ShowMoreMenu
                                open={menuOpen}
                                onClick={() => setMenuOpen(false)}
                            >
                                {moreItems && moreItems.map((moreItem) => (
                                    <MenuLink
                                        aria-label={moreItem.name}
                                        exact={moreItem.exact}
                                        key={`${moreItem.name}-${moreItem.iconName}`}
                                        to={moreItem.href}
                                    >
                                        {moreItem.name}
                                    </MenuLink>
                                ))}
                            </ShowMoreMenu>
                        </NavigationItem>
                    )}
                </Nav>
            </nav>
            <nav aria-label="App Navigation">
                <Nav>
                    {footerItems.map(navItem)}
                </Nav>
            </nav>
        </Wrapper>
    );
};
