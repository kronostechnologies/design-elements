import React, { ReactElement, useCallback, useEffect, useLayoutEffect, useState } from 'react';
import styled from 'styled-components';

import { IconButton } from '../buttons/icon-button';
import { IconName } from '../icon/icon';

const itemHeight = 48;
const footerNavHeight = itemHeight * 2;
const headerHeight = 48;

const Wrapper = styled.div`
    box-shadow: 0 6px 10px 0 rgba(0, 0, 0, 0.1);
    box-sizing: border-box;
    display: flex;
    flex-direction: column;
    height: 100%;
    justify-content: space-between;
    overflow: hidden;
    padding: var(--spacing-2x) 12px;
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
    margin-bottom: 8px;
    width: 100%;
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
                <Nav itemsVisible={lastVisibleIndex + (displayMore ? 2 : 1)}>
                    {items
                        .filter((_, index) => index <= lastVisibleIndex)
                        .map((item, index) => (
                            <NavigationItem key={index}>
                                <StyledButton
                                    onClick={item.onClick}
                                    buttonType="tertiary"
                                    iconName={item.icon as IconName}
                                    label={item.title}
                                />
                            </NavigationItem>
                    ))}
                </Nav>
            </nav>
            <footer>
                <Nav>
                    <NavigationItem>
                        <StyledButton
                            buttonType="tertiary"
                            iconName="info"
                            label="info"
                        />
                    </NavigationItem>
                </Nav>
            </footer>
        </Wrapper>
    );
}
