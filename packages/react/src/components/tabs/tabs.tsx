import React, { KeyboardEvent, ReactElement, ReactNode, useReducer, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { IconName } from '../icon/icon';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

interface TabsProps {
    tabs: Tab[];
}

export interface Tab {
    title: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    panelContent: ReactNode;
}

interface TabSelectionState {
    id: string;
    panelId: string;
    tab: Tab;
    isPanelSelected: boolean;
    isButtonSelected: boolean;
}

interface ButtonSelection {
    id: string;
    isPanelSelection: boolean;
}

function initTabsSelection(tabs: Tab[]): TabSelectionState[] {
    const tabsSelectionState = tabs.map(tab => {
        return {
            id: uuid(),
            panelId: uuid(),
            tab: tab,
            isPanelSelected: false,
            isButtonSelected: false,
        };
    });

    if (tabsSelectionState.length > 0) {
        tabsSelectionState[0].isPanelSelected = true;
    }
    return tabsSelectionState;
}

function reducer(tabsSelectionState: TabSelectionState[], buttonSelection: ButtonSelection): TabSelectionState[] {
    return tabsSelectionState.map(tabSelectionState => {
        const isPanelSelected = buttonSelection.isPanelSelection ?
            buttonSelection.id === tabSelectionState.id :
            tabSelectionState.isPanelSelected;

        return {
            id: tabSelectionState.id,
            panelId: tabSelectionState.panelId,
            tab: tabSelectionState.tab,
            isPanelSelected: isPanelSelected,
            isButtonSelected: buttonSelection.id === tabSelectionState.id,
        };
    });
}

const CenteredContentDiv = styled.div`
    align-items: center;
    display: flex;
    padding-bottom: var(--spacing-1x);
`;

export function Tabs({ tabs }: TabsProps): ReactElement {
    const [tabsState, setTabsState] = useReducer(reducer, tabs, initTabsSelection);
    const [selectedTab, setSelectedTab] = useState(tabsState[0]);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        let selectedIndex = tabsState.findIndex(tabState => tabState.isButtonSelected);
        if (selectedIndex >= 0) {
            if (event.key === 'ArrowLeft') {
                selectedIndex = (selectedIndex === 0) ? tabsState.length - 1 : selectedIndex - 1;
                selectTabByIndex(selectedIndex, false);
            } else if (event.key === 'ArrowRight') {
                selectedIndex = (selectedIndex === tabsState.length - 1) ? 0 : selectedIndex + 1;
                selectTabByIndex(selectedIndex, false);
            } else if (event.key === 'Home' && selectedIndex > 0) {
                selectTabByIndex(0, false);
            } else if (event.key === 'End' && !isLastTabIndex(selectedIndex)) {
                selectTabByIndex(tabsState.length - 1, false);
            } else if (event.key === 'Tab' && !tabsState[selectedIndex].isPanelSelected) {
                const selectedPanelIndex = tabsState.findIndex(tabState => tabState.isPanelSelected);
                selectTabByIndex(selectedPanelIndex, false);
            } else if (event.key === 'Enter' || event.key === ' ') {
                selectPanel(tabsState[selectedIndex]);
            }

            if (['Home', 'End', 'Enter', ' '].includes(event.key) ||
                (event.key === 'Tab' && !tabsState[selectedIndex].isPanelSelected)) {
                event.preventDefault();
            }
        }
    }

    function isLastTabIndex(selectedTabIndex: number): boolean {
        return selectedTabIndex === tabsState.length - 1;
    }

    function selectTabByIndex(tabIndex: number, isPanelSelection: boolean): void {
        const tabToSelect = tabsState[tabIndex];
        setTabsState({ id: tabToSelect.id, isPanelSelection: isPanelSelection });
    }

    function selectPanel(tabState: TabSelectionState): void {
        setSelectedTab(tabState);
        setTabsState({ id: tabState.id, isPanelSelection: true });
    }

    return (
        <div>
            <CenteredContentDiv
                data-testid="tab-buttons-container"
                role="tablist"
                aria-label="tabs label"
                onKeyDown={handleKeyDown}
            >
                {tabsState.map((tabState, i) => (
                    <TabButton
                        id={tabState.id}
                        panelId={tabState.panelId}
                        key={tabState.id}
                        data-testid={`tab-button-${i + 1}`}
                        leftIcon={tabState.tab.leftIcon}
                        rightIcon={tabState.tab.rightIcon}
                        isSelected={tabState.isPanelSelected}
                        isFocused={tabState.isButtonSelected}
                        onClick={() => selectPanel(tabState)}
                        onFocus={() => setTabsState({ id: tabState.id, isPanelSelection: false })}
                    >
                        {tabState.tab.title}
                    </TabButton>
                ))}
            </CenteredContentDiv>
            <TabPanel
                id={selectedTab.panelId}
                buttonId={selectedTab.id}
            >
                {selectedTab.tab.panelContent}
            </TabPanel>
        </div>
    );
}
