import React, { ReactElement, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

import { IconButton } from '../buttons/icon-button';
import { IconName } from '../icon/icon';
import { RouteLink, RouterLinkProps } from '../route-link/route-link';

const Wrapper = styled.div`
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    padding: 12px;
    width: 56px;
`;

const Nav = styled.ul<{ itemsVisible?: number }>`
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;
`;

export const NavigationItem = styled.li`
    align-items: center;
    display: flex;
    height: 32px;
    justify-content: center;
    margin: var(--spacing-half) 0;
    position: relative;
    width: 100%;

    > a {
        align-items: center;
        border-radius: 1.6rem;
        display: flex;
        height: 32px;
        justify-content: center;
        text-align: center;
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
    }
`;

const StyledButton = styled(IconButton)`
    &:hover {
        background-color: ${props => props.theme.greys.grey};
        color: ${props => props.theme.greys['dark-grey']};
    }

    &:focus {
        background-color: ${props => props.theme.main['primary-1.1']};
        color: ${props => props.theme.greys.white};

        &:hover {
            background-color: ${props => props.theme.main['primary-1.1']};
            color: ${props => props.theme.greys.white};
        }
    }
`;

const StyledDiv = styled.div`
    background-color: ${props => props.theme.greys.white};
    border-radius: var(--border-radius);
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    display: flex;
    flex-direction: column;
    left: 40px;
    position: absolute;
    top: 0;

    > a {
        color: ${props => props.theme.greys.black} !important;
        line-height: 24px;
        padding: var(--spacing-half) var(--spacing-2x);

        &:hover {
            background-color: ${props => props.theme.greys.grey};
            text-decoration: none !important;
        }
    }
`;

interface GlobalNavigationItem {
    href: string;
    iconName: string;
    name: string;
}

interface GlobalNavigationProps {
    // Item has an icon name, a title, and an onClick function
    mainItems: GlobalNavigationItem[];
    // Item has an icon name, a title, and an onClick function
    footerItems: GlobalNavigationItem[];
    routerLink: RouterLinkProps;
}

export function GlobalNavigation({
    mainItems,
    footerItems,
    routerLink,
}: GlobalNavigationProps): ReactElement {
    const WrapperRef = useRef<HTMLDivElement>(null);
    const [navItems, setNavItems] = useState(mainItems);
    const [moreItems, setMoreItems] = useState<GlobalNavigationItem[]>();
    const [overflow, setOverflow] = useState(false);
    const [overflowOpen, setOverflowOpen] = useState(false);
    const itemHeight = 40;

    useEffect(() => {
        if (WrapperRef.current === null) return;
        const totalItemsHeight = (mainItems.length + footerItems.length) * itemHeight;
        const wrapperHeight =  WrapperRef.current.clientHeight - 24;
        if (totalItemsHeight >= wrapperHeight) {
            const wrapperCapacity = Math.floor(wrapperHeight / itemHeight);
            const visibleItems = wrapperCapacity - footerItems.length;
            setNavItems(mainItems.filter((_, index) => index < visibleItems - 1));
            setMoreItems(mainItems.filter((_, index) => index >= visibleItems - 1));
            setOverflow(true);
        } else {
            setNavItems(mainItems);
            setOverflow(false);
        }
    }, [mainItems]);

    return (
        <Wrapper ref={WrapperRef}>
            <nav>
                <Nav>
                    {navItems.map((item, index) => (
                        <NavigationItem key={index}>
                            <RouteLink
                                routerLink={routerLink}
                                href={item.href}
                                iconName={item.iconName as IconName}
                            />
                        </NavigationItem>
                    ))}
                    {overflow && (
                        <NavigationItem>
                            <StyledButton
                                buttonType="tertiary"
                                iconName="moreVertical"
                                label="show more"
                                onClick={() => setOverflowOpen(!overflowOpen)}
                            />
                            <StyledDiv onClick={() => setOverflowOpen(false)}>
                                {moreItems && overflowOpen && moreItems.map((moreItem, i) => (
                                    <RouteLink
                                        key={i}
                                        routerLink={routerLink}
                                        href={moreItem.href}
                                        label={moreItem.name}
                                    />
                                ))}
                            </StyledDiv>
                        </NavigationItem>
                    )}
                </Nav>
            </nav>
            <footer>
                <Nav>
                    {footerItems.map((item, index) => (
                        <NavigationItem key={index}>
                            <RouteLink
                                routerLink={routerLink}
                                href={item.href}
                                iconName={item.iconName as IconName}
                            />
                        </NavigationItem>
                    ))}
                </Nav>
            </footer>
        </Wrapper>
    );
}
