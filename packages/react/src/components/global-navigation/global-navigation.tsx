import React, { ReactElement, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import { Icon, IconName } from '../icon/icon';

import styled from 'styled-components';
import { Popover } from '../popover/popover';

const itemHeight = 48;
const footerNavHeight = itemHeight * 2;
const headerHeight = 48;
const textColor = '#57666e';

const Wrapper = styled.div`
    box-shadow: 0 3px 6px 0 rgba(0, 0, 0, 0.2);
    display: grid;
    grid-template-rows: ${`1fr ${footerNavHeight}px`};
    height: 100%;
    overflow: hidden;
    width: 56px;
`;

const MainNav = styled.ul<{ itemsVisible: number }>`
    display: grid;
    grid-template-rows: ${({ itemsVisible }) => `repeat(${itemsVisible}, ${itemHeight}px)`};
    margin: 0;
    padding: 0;
`;

const FooterNav = styled.ul`
    align-content: end;
    display: grid;
    grid-template-rows: ${`repeat(2, ${itemHeight}px)`};
    margin: 0;
    padding: 0;
`;

export const NavigationItem = styled.li`
    display: flex;

    button {
        appearance: none;
        background: none;
        border: 0;
    }

    > a,
    > button {
        align-items: center;
        color: ${props => props.theme.greys['dark-grey']};
        display: flex;
        justify-content: center;
        position: relative;
        width: 100%;

        :hover {
            cursor: pointer;

            svg {
                color: ${props => props.theme.greys.white};
                z-index: 1;
            }

            ::before {
                background-color: ${props => props.theme.main['primary-1.3']};
                border-radius: 50%;
                bottom: 12px;
                content: "";
                display: block;
                left: 12px;
                position: absolute;
                right: 12px;
                top: 12px;
                z-index: 0;
            }
        }

        :focus,
        &.active {
            cursor: pointer;

            svg {
                color: ${props => props.theme.greys.white};
                z-index: 1;
            }

            ::before {
                background-color: ${props => props.theme.main['primary-1.1']};
                border-radius: 50%;
                bottom: 12px;
                content: "";
                display: block;
                left: 12px;
                position: absolute;
                right: 12px;
                top: 12px;
                z-index: 0;
            }
        }
    }
`;

const MoreIcon = styled(Icon)`
    transform: rotate(90deg);
`;

interface GlobalNavigationItem {
    icon: string;
    title: string;
    onClick(): void;
}

interface GlobalNavigationProps {
    // Item has an icon name, a title, and an onClick function
    items: GlobalNavigationItem[];
    // React element to be provided to fill the popover
    footerNavPopoverContent: ReactElement;
    // Number of items visible in the main nav section, if not provided this will take the space available
    maxItemsVisible?: number;
    // Callback function triggered when Info Icon is clicked
    onInfoIconClick(): void;
}

function useWindowSize(): { width: number, height: number }  {
    const getSize = useCallback(() => {
        return {
            width: window.innerWidth,
            height: window.innerHeight,
        };
    }, []);

    const [windowSize, setWindowSize] = useState(getSize);

    useEffect(() => {
        function handleResize(): void {
            setWindowSize(getSize());
        }

        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, [getSize]);

    return windowSize;
}

export function GlobalNavigation({
    items = [],
    footerNavPopoverContent,
    onInfoIconClick,
    maxItemsVisible,
}: GlobalNavigationProps): ReactElement {
    const [lastVisibleIndex, setLastVisibleIndex] = useState();
    const [displayMore, setDisplayMore] = useState(false);
    const { height: windowHeight } = useWindowSize();

    useLayoutEffect(() => {
        // Number of items available vertically in the main nav section
        const numberOfItemsAvailable =
            maxItemsVisible || Math.floor((windowHeight - headerHeight - footerNavHeight) / itemHeight);
        const isMaxItemsReached = items.length > numberOfItemsAvailable;
        const lastIndex = numberOfItemsAvailable - 1;

        setLastVisibleIndex(lastIndex);
        setDisplayMore(isMaxItemsReached && lastVisibleIndex > 0);
    }, [items.length, lastVisibleIndex, windowHeight]);

    return (
        <Wrapper>
            <nav>
                <MainNav itemsVisible={lastVisibleIndex + (displayMore ? 2 : 1)}>
                    {items
                        .filter((_, index) => index <= lastVisibleIndex)
                        .map((item, index) => (
                            <NavigationItem key={index}>
                                <button onClick={item.onClick} title={item.title}>
                                    <Icon name={item.icon as IconName} color={textColor} size="16" />
                                </button>
                            </NavigationItem>
                        ))}
                    {displayMore && (
                        <NavigationItem>
                            <Popover
                                position="right"
                                target={
                                    <button>
                                        <MoreIcon name="moreHorizontal" size="16" />
                                    </button>
                                }
                            >
                            {items
                                .filter((_, index) => index > lastVisibleIndex)
                                .map((item, index) => (
                                    <li key={index}>
                                        <button title={item.title}>{item.title}</button>
                                    </li>
                                ))}
                            </Popover>
                        </NavigationItem>
                    )}
                </MainNav>
            </nav>
            <footer>
                <FooterNav>
                    <NavigationItem>
                        <Popover
                            position="right"
                            target={
                                <button>
                                    <Icon name="helpCircle" size="16" />
                                </button>
                            }
                        >
                            {footerNavPopoverContent}
                        </Popover>
                    </NavigationItem>
                    <NavigationItem>
                        <button onClick={onInfoIconClick}>
                            <Icon name="info" size="16" />
                        </button>
                    </NavigationItem>
                </FooterNav>
            </footer>
        </Wrapper>
    );
}
