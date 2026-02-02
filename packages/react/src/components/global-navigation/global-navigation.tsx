import { ReactElement, useEffect, useRef, useState, VoidFunctionComponent } from 'react';
import { NavLink, NavLinkProps } from 'react-router-dom';
import styled from 'styled-components';
import { focus } from '../../utils/css-state';
import { eventIsInside } from '../../utils/events';
import { IconButton, IconButtonProps } from '../buttons/icon-button';
import { Icon, IconName } from '../icon/icon';

const Wrapper = styled.div`
    background-color: ${({ theme }) => theme.component['global-navigation-background-color']};
    box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['global-navigation-box-shadow-color']};
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    width: var(--size-4halfx);
`;

const NavList = styled.ul`
    list-style: none;
    margin: 0;
    padding: 0;

    & > li:first-child > :first-child {
        padding-top: var(--spacing-1x);
    }
`;

const MenuLink = styled(NavLink)`
    color: ${({ theme }) => theme.component['global-navigation-item-text-color']};
    display: flex;
    flex-grow: 1;
    line-height: 1.5rem;
    padding: var(--spacing-half) var(--spacing-2x);
    text-decoration: none;
    width: max-content;

    ${focus};

    &:hover {
        background-color: ${({ theme }) => theme.component['global-navigation-item-hover-background-color']};
    }

    &.active {
        background-color: ${({ theme }) => theme.component['global-navigation-item-selected-background-color']};
        color: ${({ theme }) => theme.component['global-navigation-item-selected-text-color']};
        font-weight: var(--font-bold);
    }
`;

const ShowMoreMenu = styled.ul<{ open?: boolean }>`
    background-color: ${({ theme }) => theme.component['global-navigation-background-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 10px 20px 0 ${({ theme }) => theme.component['global-navigation-box-shadow-color']};
    display: ${({ open }) => (open ? 'flex' : 'none')};
    flex-wrap: wrap;
    left: 4.5rem;
    list-style: none;
    margin: 0;
    padding: 0;
    position: absolute;
    top: 0;

    li {
        display: flex;
        flex-grow: 1;
    }

    & > :first-child a {
        border-radius: var(--border-radius) var(--border-radius) 0 0;
    }

    & > :last-child a {
        border-radius: 0 0 var(--border-radius) var(--border-radius);
    }
`;

const ShowMore = styled.button<{ active?: boolean }>`
    align-items: center;
    box-sizing: border-box;
    color: ${({ theme }) => theme.component['global-navigation-item-text-color']};
    display: flex;
    justify-content: center;
    min-height: var(--size-3halfx);
    padding: var(--spacing-half) var(--spacing-1x);
    width: var(--size-4halfx);

    ${focus};

    &:hover {
        background-color: ${({ theme }) => theme.component['global-navigation-item-hover-background-color']};
        color: ${({ theme }) => theme.component['global-navigation-item-hover-text-color']};
    }
`;

const NavigationItem = styled.li`
    position: relative;

    &:hover {
        ${ShowMoreMenu} {
            display: flex;
        }
    }
`;

const ItemLink = styled(ShowMore).attrs({ as: NavLink })<NavLinkProps>`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    text-decoration: none;

    &.active {
        background-color: ${({ theme }) => theme.component['global-navigation-item-selected-background-color']};
        color: ${({ theme }) => theme.component['global-navigation-item-selected-text-color']};
        font-weight: var(--font-bold);
    }
`;

const WrapperNav = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
`;

const ItemSpan = styled.span`
    font-size: 0.75rem;
    line-height: 1.25rem;
    text-align: center;
    word-break: break-word;
`;

const separatorHeight = 17;
const separatorMargins = 16;
const Separator = styled.hr`
    background-color: ${({ theme }) => theme.component['global-navigation-separator-border-color']};
    border: 0;
    height: ${separatorHeight - separatorMargins}px;
    margin: var(--spacing-1x) auto;
    width: 40px;
`;

const coreActionButtonHeight = 72;
const CoreActionButton = styled(IconButton)`
    height: var(--size-2halfx);
    margin: var(--spacing-2x);
    width: var(--size-2halfx);
`;

export interface GlobalNavigationItem {
    end?: boolean;
    href: string;
    iconName: IconName;
    name: string;

    onClick?(): void;
}

interface GlobalNavigationProps {
    className?: string;
    coreActionButton?: IconButtonProps;
    /** Item has an icon name, a name, and a href */
    mainItems: GlobalNavigationItem[];
    /** Item has an icon name, a name, and a href */
    footerItems: GlobalNavigationItem[];
}

export const GlobalNavigation: VoidFunctionComponent<GlobalNavigationProps> = ({
    className,
    mainItems,
    footerItems,
    coreActionButton,
}) => {
    const wrapperRef = useRef<HTMLDivElement>(null);
    const [navItems, setNavItems] = useState(mainItems);
    const [moreItems, setMoreItems] = useState<GlobalNavigationItem[]>();
    const [overflow, setOverflow] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);

    function handleClickOutside(event: MouseEvent): void {
        const wrapperRefIsNull = wrapperRef.current === null;
        const wrapperContainsClick = eventIsInside(event, wrapperRef.current);
        const shouldClose = wrapperRefIsNull || !wrapperContainsClick;

        if (shouldClose) {
            setMenuOpen(false);
        }
    }

    function handleItemClick(callback?: () => void): void {
        callback?.();
        setMenuOpen(false);
    }

    useEffect(() => {
        if (overflow) {
            if (wrapperRef.current === null) {
                return;
            }

            document.addEventListener('mouseup', handleClickOutside);
            return () => document.removeEventListener('mouseup', handleClickOutside);
        }

        return undefined;
    }, [overflow]);

    useEffect(() => {
        if (wrapperRef.current === null) {
            return;
        }
        const getHTMLCollectionHeight = (collection: HTMLCollection): number => Array.from(collection)
            .reduce((total, el) => total + el.clientHeight, 0);
        const navElements = wrapperRef.current.getElementsByTagName('nav');
        const mainNavElementItems = navElements[0].getElementsByTagName('li');
        const mainNavElementsHeight = getHTMLCollectionHeight(mainNavElementItems);
        const footerNavElementHeight = getHTMLCollectionHeight(navElements[1].getElementsByTagName('li'));
        const totalItemsHeight = mainNavElementsHeight + footerNavElementHeight;
        const wrapperInnerHeight = wrapperRef.current.clientHeight;
        const heightAvailableForItems = wrapperInnerHeight - separatorHeight
            - (coreActionButton ? coreActionButtonHeight : 0);

        if (totalItemsHeight >= heightAvailableForItems) {
            let visibleItemsHeight = 0;
            let visibleItemsCount = 0;
            while (visibleItemsHeight < heightAvailableForItems - footerNavElementHeight
            && visibleItemsCount < mainItems.length) {
                visibleItemsHeight += mainNavElementItems[visibleItemsCount].clientHeight;
                visibleItemsCount += 1;
            }
            const visibleItems = visibleItemsCount - (visibleItemsHeight > heightAvailableForItems ? 1 : 0);
            setNavItems(mainItems.filter((_, index) => index < visibleItems - 1));
            setMoreItems(mainItems.filter((_, index) => index >= visibleItems - 1));
            setOverflow(true);
        } else {
            setNavItems(mainItems);
            setOverflow(false);
        }
    }, [footerItems.length, mainItems, wrapperRef, coreActionButton]);

    const navItem = (item: GlobalNavigationItem): ReactElement => (
        <NavigationItem key={`${item.name}-${item.iconName}`}>
            <ItemLink
                data-testid={`${item.name}-${item.iconName}-link`}
                end={item.end}
                to={item.href}
                onClick={() => handleItemClick(item.onClick)}
                onFocus={() => setMenuOpen(false)}
            >
                <Icon aria-hidden="true" name={item.iconName} size="20" />
                <ItemSpan>{item.name}</ItemSpan>
            </ItemLink>
        </NavigationItem>
    );

    return (
        <Wrapper className={className} ref={wrapperRef}>
            <WrapperNav>
                {coreActionButton && (
                    <CoreActionButton
                        {...coreActionButton /* eslint-disable-line react/jsx-props-no-spreading */}
                        data-testid="core-action-button"
                    />
                )}
                <nav aria-label="App Navigation">
                    <NavList>
                        {navItems.map(navItem)}
                        {overflow && (
                            <NavigationItem>
                                <ShowMore
                                    aria-label="Show more navigation elements"
                                    aria-expanded={menuOpen}
                                    aria-haspopup="true"
                                    type="button"
                                    data-testid="show-more-button"
                                    onClick={() => setMenuOpen(!menuOpen)}
                                >
                                    <Icon name="moreVertical" size="16" />
                                </ShowMore>
                                <ShowMoreMenu open={menuOpen} data-testid="show-more-menu">
                                    {moreItems && moreItems.map((moreItem) => (
                                        <li key={`${moreItem.name}-${moreItem.iconName}`}>
                                            <MenuLink
                                                data-testid={`${moreItem.name}-${moreItem.iconName}-menu-link`}
                                                end={moreItem.end}
                                                to={moreItem.href}
                                                onClick={() => handleItemClick(moreItem.onClick)}
                                            >
                                                {moreItem.name}
                                            </MenuLink>
                                        </li>
                                    ))}
                                </ShowMoreMenu>
                            </NavigationItem>
                        )}
                    </NavList>
                </nav>
            </WrapperNav>
            <div>
                <Separator />
                <nav aria-label="App Navigation">
                    <NavList>
                        {footerItems.map(navItem)}
                    </NavList>
                </nav>
            </div>

        </Wrapper>
    );
};

GlobalNavigation.displayName = 'GlobalNavigation';
