import React, { KeyboardEvent, ReactElement, ReactNode, useReducer } from 'react';
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
    padding-bottom: 5px;
`;

export function Tabs({ tabs }: TabsProps): ReactElement {
    const [tabsState, setTabsState] = useReducer(reducer, tabs, initTabsSelection);

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        let selectedIndex = tabsState.findIndex(tabState => tabState.isButtonSelected);
        if (selectedIndex >= 0) {
            if (event.key === 'ArrowLeft') {
                selectedIndex = (selectedIndex === 0) ? tabsState.length - 1 : selectedIndex - 1;
                selectTabByIndex(selectedIndex, false);
            } else if (event.key === 'ArrowRight' || (event.key === 'Tab' && !isLastTabIndex(selectedIndex))) {
                selectedIndex = (selectedIndex === tabsState.length - 1) ? 0 : selectedIndex + 1;
                selectTabByIndex(selectedIndex, false);
            } else if (event.key === 'Home' && selectedIndex > 0) {
                selectTabByIndex(0, false);
            } else if (event.key === 'End' && !isLastTabIndex(selectedIndex)) {
                selectTabByIndex(tabsState.length - 1, false);
            } else if (event.key === 'Enter' || event.key === ' ') {
                selectTabByIndex(selectedIndex, true);
            }

            if (['Home', 'End', 'Enter', ' '].includes(event.key) ||
                (event.key === 'Tab' && !isLastTabIndex(selectedIndex))) {
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

    return (
        <div>
            <CenteredContentDiv
                data-testid="tab-buttons-div"
                role="tablist"
                aria-label="tabs label"
                onKeyDown={handleKeyDown}
            >
                {tabsState.map((tabState, i) => (
                    <TabButton
                        key={tabState.id}
                        id={tabState.id}
                        data-testid={`tab-button--${i + 1}`}
                        textValue={tabState.tab.title}
                        leftIcon={tabState.tab.leftIcon}
                        rightIcon={tabState.tab.rightIcon}
                        controlledPanelId={tabState.panelId}
                        isSelected={tabState.isPanelSelected}
                        isFocused={tabState.isButtonSelected}
                        onClick={() => setTabsState({ id: tabState.id, isPanelSelection: true })}
                        onFocus={() => setTabsState({ id: tabState.id, isPanelSelection: false })}
                    />
                ))}
            </CenteredContentDiv>

            {tabsState.map((tabState, i) => (
                <TabPanel
                    key={tabState.panelId}
                    id={tabState.panelId}
                    data-testid={`tab-panel--${i + 1}`}
                    associatedTabId={tabState.id}
                    isSelected={tabState.isPanelSelected}
                >
                    {tabState.tab.panelContent}
                </TabPanel>
            ))}
        </div>
    );
}
