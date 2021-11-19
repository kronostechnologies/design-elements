import { createRef, KeyboardEvent, ReactElement, ReactNode, RefObject, useMemo, useState } from 'react';
import styled from 'styled-components';
import { getNextElementInArray, getPreviousElementInArray } from '../../utils/array';
import { v4 as uuid } from '../../utils/uuid';
import { IconName } from '../icon/icon';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

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

interface TabsProps {
    className?: string;
    forceRenderTabPanels?: boolean;
    tabs: Tab[];
}

const CenteredContentDiv = styled.div`
    align-items: center;
    border-bottom: 1px solid #878f9a; /* TODO change colors when updating thematization */
    display: flex;
    margin-bottom: var(--spacing-1x);
`;

export function Tabs({ className, forceRenderTabPanels, tabs }: TabsProps): ReactElement {
    const tabItems: TabItem[] = useMemo((): TabItem[] => tabs.map(
        (tab, i) => ({
            ...tab,
            id: `${tab.title}-${i}`,
            panelId: uuid(),
            buttonRef: createRef<HTMLButtonElement>(),
        }),
    ), [tabs]);
    const [selectedTabId, setSelectedTabId] = useState(tabItems[0].id);

    function isTabSelected(tabId: string): boolean {
        return selectedTabId === tabId;
    }

    function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>, id: string): void {
        const currentlyFocusedButtonTabIndex = tabItems.findIndex((tab) => tab.id === id);

        switch (event.key) {
            case 'ArrowRight': {
                const nextTabButton = getNextElementInArray(tabItems, currentlyFocusedButtonTabIndex)
                    ?.buttonRef.current;
                nextTabButton?.focus();
                break;
            }
            case 'ArrowLeft': {
                const previousTabButton = getPreviousElementInArray(tabItems, currentlyFocusedButtonTabIndex)
                    ?.buttonRef.current;
                previousTabButton?.focus();
                break;
            }
            case 'Tab': {
                const selectedTabButton = tabItems.find((tab) => isTabSelected(tab.id))?.buttonRef.current;
                const focusIsCurrentlyOnSelectedTabButton = selectedTabId
                    === tabItems[currentlyFocusedButtonTabIndex].id;

                if (selectedTabButton && !focusIsCurrentlyOnSelectedTabButton) {
                    event.preventDefault();
                    selectedTabButton?.focus();
                }
                break;
            }
            case 'Home': {
                event.preventDefault();
                tabItems[0].buttonRef.current?.focus();
                break;
            }
            case 'End': {
                event.preventDefault();
                tabItems[tabItems.length - 1].buttonRef.current?.focus();
                break;
            }
            default:
                break;
        }
    }

    return (
        <div className={className}>
            <CenteredContentDiv
                data-testid="tab-buttons-container"
                role="tablist"
                aria-label="tabs label"
            >
                {tabItems.map((tabItem, i) => (
                    <TabButton
                        id={tabItem.id}
                        panelId={tabItem.panelId}
                        key={tabItem.panelId}
                        data-testid={`tab-button-${i + 1}`}
                        leftIcon={tabItem.leftIcon}
                        rightIcon={tabItem.rightIcon}
                        isSelected={isTabSelected(tabItem.id)}
                        ref={tabItem.buttonRef}
                        onClick={() => setSelectedTabId(tabItem.id)}
                        onKeyDown={(event) => handleButtonKeyDown(event, tabItem.id)}
                    >
                        {tabItem.title}
                    </TabButton>
                ))}
            </CenteredContentDiv>
            {tabItems.map((tabItem, i) => {
                if (forceRenderTabPanels || isTabSelected(tabItem.id)) {
                    return (
                        <TabPanel
                            id={tabItem.panelId}
                            data-testid={`tab-panel-container-${i + 1}`}
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
}
