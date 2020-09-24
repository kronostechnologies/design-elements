import React, { ReactElement, ReactNode, useReducer } from 'react';

import uuid from 'uuid/v4';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

interface TabsProps {
    tabs: Tab[];
}

interface Tab {
    title: string;
    panelContent: ReactNode;
}

interface TabSelectionState {
    id: string;
    panelId: string;
    title: string;
    panelContent: ReactNode;
    isSelected: boolean;
}

interface TabSelection {
    id: string;
}

function initTabsSelection(tabs: Tab[]): TabSelectionState[] {
    const tabsSelectionState = tabs.map(tab => {
        return {
            id: uuid(),
            panelId: uuid(),
            title: tab.title,
            panelContent: tab.panelContent,
            isSelected: false,
        };
    });

    if (tabsSelectionState.length > 0) {
        tabsSelectionState[0].isSelected = true;
    }
    return tabsSelectionState;
}

function reducer(tabsSelectionState: TabSelectionState[], tabSelection: TabSelection): TabSelectionState[] {
    return tabsSelectionState.map(tabSelectionState => {
        return {
            id: tabSelectionState.id,
            panelId: tabSelectionState.panelId,
            title: tabSelectionState.title,
            panelContent: tabSelectionState.panelContent,
            isSelected: tabSelection.id === tabSelectionState.id,
        };
    });
}

export function Tabs({ tabs }: TabsProps): ReactElement {
    const [tabsState, setTabsState] = useReducer(reducer, tabs, initTabsSelection);

    return (
        <div>
            <div role="tablist" aria-label="tabs label">
                {tabsState.map(tab => {
                    return <TabButton
                        key={tab.id}
                        id={tab.id}
                        textValue={tab.title}
                        controlledPanelId={tab.panelId}
                        isSelected={tab.isSelected}
                        selectionCallback={setTabsState}
                    />;
                })}
            </div>

            {tabsState.map(tab => {
                return <TabPanel
                    key={tab.panelId}
                    id={tab.panelId}
                    associatedTabId={tab.id}
                    isSelected={tab.isSelected}
                >
                    {tab.panelContent}
                </TabPanel>;
            })}
        </div>
    );
}
