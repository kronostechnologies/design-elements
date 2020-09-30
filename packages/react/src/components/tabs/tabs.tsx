import React, { KeyboardEvent, ReactElement, ReactNode, useReducer } from 'react';

import styled from 'styled-components';
import uuid from 'uuid/v4';
import { IconName } from '../icon/icon';
import { ButtonSelection, TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

interface TabsProps {
    tabs: Tab[];
}

export interface Tab {
    title: string;
    leftIconName?: IconName;
    rightIconName?: IconName;
    panelContent: ReactNode;
}

interface TabSelectionState {
    id: string;
    panelId: string;
    title: string;
    leftIconName?: IconName;
    rightIconName?: IconName;
    panelContent: ReactNode;
    isPanelSelected: boolean;
    isButtonSelected: boolean;
}

function initTabsSelection(tabs: Tab[]): TabSelectionState[] {
    const tabsSelectionState = tabs.map(tab => {
        return {
            id: uuid(),
            panelId: uuid(),
            title: tab.title,
            leftIconName: tab.leftIconName,
            rightIconName: tab.rightIconName,
            panelContent: tab.panelContent,
            isPanelSelected: false,
            isButtonSelected: false,
        };
    });

    if (tabsSelectionState.length > 0) {
        tabsSelectionState[0].isPanelSelected = true;
        tabsSelectionState[0].isButtonSelected = true;
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
            title: tabSelectionState.title,
            leftIconName: tabSelectionState.leftIconName,
            rightIconName: tabSelectionState.rightIconName,
            panelContent: tabSelectionState.panelContent,
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

    const handleKeyDown = (event: KeyboardEvent<HTMLDivElement>) => {
        const selectedIndex = tabsState.findIndex(tabState => tabState.isButtonSelected);
        if (event.key === 'ArrowLeft' && selectedIndex > 0) {
            const tabToSelect = tabsState[selectedIndex - 1];
            setTabsState({ id: tabToSelect.id, isPanelSelection: false });
        } else if (event.key === 'ArrowRight' && selectedIndex < tabsState.length - 1) {
            const tabToSelect = tabsState[selectedIndex + 1];
            setTabsState({ id: tabToSelect.id, isPanelSelection: false });
        } else if (event.key === 'Enter' || event.key === ' ') {
            const tabToSelect = tabsState[selectedIndex];
            setTabsState({ id: tabToSelect.id, isPanelSelection: true });
            event.preventDefault();
        }
    };

    return (
        <div>
            <CenteredContentDiv role="tablist" aria-label="tabs label" onKeyDown={handleKeyDown}>
                {tabsState.map(tab => {
                    return <TabButton
                        key={tab.id}
                        id={tab.id}
                        textValue={tab.title}
                        leftIconName={tab.leftIconName}
                        rightIconName={tab.rightIconName}
                        controlledPanelId={tab.panelId}
                        isSelected={tab.isPanelSelected}
                        isFocused={tab.isButtonSelected}
                        selectionCallback={setTabsState}
                    />;
                })}
            </CenteredContentDiv>

            {tabsState.map(tab => {
                return <TabPanel
                    key={tab.panelId}
                    id={tab.panelId}
                    associatedTabId={tab.id}
                    isSelected={tab.isPanelSelected}
                >
                    {tab.panelContent}
                </TabPanel>;
            })}
        </div>
    );
}
