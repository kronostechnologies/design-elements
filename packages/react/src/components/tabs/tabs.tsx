import {
    createRef,
    KeyboardEvent,
    ReactNode,
    RefObject,
    useMemo,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { getNextElement, getPreviousElement } from '../../utils/array';
import { v4 as uuid } from '../../utils/uuid';
import { IconName } from '../icon/icon';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

const TabButtonsContainer = styled.div<{ $isGlobal?: boolean; }>`
    align-items: center;
    border-bottom: ${({ $isGlobal, theme }) => ($isGlobal ? 'none' : `1px solid ${theme.component['tabs-tab-border-bottom-color']}`)};
    display: flex;
    padding: ${({ $isGlobal }) => ($isGlobal ? '0' : '0 0 0 var(--spacing-4x)')};
`;

export interface Tab {
    id?: string;
    title: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    panelContent: ReactNode;
    onBeforeUnload?(): Promise<boolean>;
}

interface TabItem extends Tab {
    id: string;
    panelId: string;
    buttonRef: RefObject<HTMLButtonElement>;
    onBeforeUnload?(): Promise<boolean>;
}

interface Props {
    className?: string;
    /** Not available in global mode */
    contained?: boolean;
    forceRenderTabPanels?: boolean;
    global?: boolean;
    tabs: Tab[];
}

export const Tabs: VoidFunctionComponent<Props> = ({
    className, contained, global, forceRenderTabPanels, tabs,
}) => {
    const tabItems: TabItem[] = useMemo((): TabItem[] => tabs.map(
        (tab, i) => ({
            ...tab,
            id: tab.id ?? `${i}`,
            panelId: uuid(),
            buttonRef: createRef<HTMLButtonElement>(),
        }),
    ), [tabs]);
    const [selectedTab, setSelectedTab] = useState(tabItems[0]);

    async function handleTabSelected(tabItem: TabItem): Promise<void> {
        if (selectedTab?.onBeforeUnload) {
            const isConfirmed = await selectedTab.onBeforeUnload();
            if (isConfirmed) {
                setSelectedTab(tabItem);
            }
        } else {
            setSelectedTab(tabItem);
        }
    }

    function isTabSelected(tabId: string): boolean {
        return selectedTab.id === tabId;
    }

    function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>, currentlyFocusedTab: TabItem): void {
        const currentlyFocusedTabIndex = tabItems.findIndex((tab) => tab.id === currentlyFocusedTab.id);

        switch (event.key) {
            case 'ArrowRight': {
                const nextTabButton = getNextElement(tabItems, currentlyFocusedTabIndex, { wrapAround: true });
                nextTabButton?.buttonRef.current?.focus();
                break;
            }
            case 'ArrowLeft': {
                const previousTabButton = getPreviousElement(tabItems, currentlyFocusedTabIndex, { wrapAround: true });
                previousTabButton?.buttonRef.current?.focus();
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
                        data-testid={`tabs-tab-${i + 1}`}
                        leftIcon={tabItem.leftIcon}
                        rightIcon={tabItem.rightIcon}
                        isSelected={isTabSelected(tabItem.id)}
                        ref={tabItem.buttonRef}
                        onClick={() => handleTabSelected(tabItem)}
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
                            buttonId={tabItem.id}
                            contained={contained && !global}
                            hidden={!isTabSelected(tabItem.id)}
                            id={tabItem.panelId}
                            key={tabItem.panelId}
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
