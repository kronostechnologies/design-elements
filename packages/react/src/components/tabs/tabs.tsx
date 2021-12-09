import { createRef, KeyboardEvent, ReactNode, RefObject, useMemo, useState, VoidFunctionComponent } from 'react';
import styled from 'styled-components';
import { getNextElementInArray, getPreviousElementInArray } from '../../utils/array';
import { v4 as uuid } from '../../utils/uuid';
import { IconName } from '../icon/icon';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

const TabButtonsContainer = styled.div<{ $isGlobal?: boolean; }>`
    align-items: center;
    border-bottom: ${({ $isGlobal }) => ($isGlobal ? 'none' : '1px solid #878f9a')}; /* TODO change colors when updating thematization */
    display: flex;
    padding: ${({ $isGlobal }) => ($isGlobal ? '0' : '0 var(--spacing-2x)')};
`;

export interface Tab {
    title: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    panelContent: ReactNode;
}

interface TabItem extends Tab {
    id: string;
    panelId: string;
    buttonRef: RefObject<HTMLButtonElement>;
}

interface Props {
    className?: string;
    forceRenderTabPanels?: boolean;
    global?: boolean;
    tabs: Tab[];
}

export const Tabs: VoidFunctionComponent<Props> = ({
    className, global, forceRenderTabPanels, tabs,
}) => {
    const tabItems: TabItem[] = useMemo((): TabItem[] => tabs.map(
        (tab, i) => ({
            ...tab,
            id: `${tab.title}-${i}`,
            panelId: uuid(),
            buttonRef: createRef<HTMLButtonElement>(),
        }),
    ), [tabs]);
    const [selectedTab, setSelectedTab] = useState(tabItems[0]);

    function isTabSelected(tabId: string): boolean {
        return selectedTab.id === tabId;
    }

    function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentlyFocusedTab: TabItem): void {
        const currentlyFocusedTabIndex = tabItems.findIndex((tab) => tab.id === currentlyFocusedTab.id);

        switch (event.key) {
            case 'ArrowRight': {
                const nextTabButton = getNextElementInArray(tabItems, currentlyFocusedTabIndex)
                    ?.buttonRef.current;
                nextTabButton?.focus();
                break;
            }
            case 'ArrowLeft': {
                const previousTabButton = getPreviousElementInArray(tabItems, currentlyFocusedTabIndex)
                    ?.buttonRef.current;
                previousTabButton?.focus();
                break;
            }
            case 'Tab': {
                const focusIsCurrentlyOnSelectedTabButton = isTabSelected(currentlyFocusedTab.id);

                if (!focusIsCurrentlyOnSelectedTabButton) {
                    event.preventDefault();
                    selectedTab?.buttonRef.current?.focus();
                }
                break;
            }
            case 'Home': {
                const focusIsCurrentlyOnFirstTabButton = tabItems[0].id === currentlyFocusedTab.id;

                if (!focusIsCurrentlyOnFirstTabButton) {
                    event.preventDefault();
                    tabItems[0].buttonRef.current?.focus();
                }
                break;
            }
            case 'End': {
                const focusIsCurrentlyOnLastTabButton = tabItems[tabItems.length - 1].id === currentlyFocusedTab.id;

                if (!focusIsCurrentlyOnLastTabButton) {
                    event.preventDefault();
                    tabItems[tabItems.length - 1].buttonRef.current?.focus();
                }
                break;
            }
            default:
                break;
        }
    }

    return (
        <div className={className}>
            <TabButtonsContainer
                role="tablist"
                aria-label="tabs label"
                $isGlobal={global}
            >
                {tabItems.map((tabItem, i) => (
                    <TabButton
                        global={global}
                        id={tabItem.id}
                        panelId={tabItem.panelId}
                        key={tabItem.panelId}
                        data-testid={`tab-button-${i + 1}`}
                        leftIcon={tabItem.leftIcon}
                        rightIcon={tabItem.rightIcon}
                        isSelected={isTabSelected(tabItem.id)}
                        ref={tabItem.buttonRef}
                        onClick={() => setSelectedTab(tabItem)}
                        onKeyDown={(event) => handleButtonKeyDown(event, tabItem)}
                    >
                        {tabItem.title}
                    </TabButton>
                ))}
            </TabButtonsContainer>
            {tabItems.map((tabItem) => {
                if (forceRenderTabPanels || isTabSelected(tabItem.id)) {
                    return (
                        <TabPanel
                            id={tabItem.panelId}
                            buttonId={tabItem.id}
                            key={tabItem.panelId}
                            hidden={!isTabSelected(tabItem.id)}
                        >
                            {tabItem.panelContent}
                        </TabPanel>
                    );
                }
                return null;
            })}
        </div>
    );
};
