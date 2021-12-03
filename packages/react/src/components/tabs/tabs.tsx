import { KeyboardEvent, ReactElement, ReactNode, useCallback, useReducer } from 'react';
import styled from 'styled-components';
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

interface TabsProps {
    className?: string;
    forceRenderTabPanels?: boolean;
    tabs: Tab[];
}

interface TabSelectionState {
    id: string;
    panelId: string;
    tab: Tab;
    isPanelSelected: boolean;
    isButtonSelected: boolean;
    shouldRender: boolean;
}

interface ButtonSelection {
    id: string;
    isPanelSelection: boolean;
}

function initTabsSelection(tabs: Tab[]): TabSelectionState[] {
    const tabsSelectionState = tabs.map((tab) => ({
        id: uuid(),
        panelId: uuid(),
        tab,
        isPanelSelected: false,
        isButtonSelected: false,
        shouldRender: false,
    }));

    if (tabsSelectionState.length > 0) {
        tabsSelectionState[0].isPanelSelected = true;
        tabsSelectionState[0].shouldRender = true;
    }
    return tabsSelectionState;
}

const CenteredContentDiv = styled.div`
    align-items: center;
    border-bottom: 1px solid #878f9a; /* TODO change colors when updating thematization */
    display: flex;
    margin-bottom: var(--spacing-1x);
`;

export function Tabs({ className, forceRenderTabPanels, tabs }: TabsProps): ReactElement {
    const reducer = useCallback(
        (tabsSelectionState: TabSelectionState[], buttonSelection: ButtonSelection) => tabsSelectionState.map(
            (tabSelectionState) => {
                const isPanelSelected = buttonSelection.isPanelSelection
                    ? buttonSelection.id === tabSelectionState.id
                    : tabSelectionState.isPanelSelected;

                return {
                    id: tabSelectionState.id,
                    panelId: tabSelectionState.panelId,
                    tab: tabSelectionState.tab,
                    isPanelSelected,
                    shouldRender: forceRenderTabPanels
                        ? tabSelectionState.shouldRender || isPanelSelected
                        : isPanelSelected,
                    isButtonSelected: buttonSelection.id === tabSelectionState.id,
                };
            },
        ),
        [forceRenderTabPanels],
    );

    const [tabsState, setTabsState] = useReducer(
        reducer, tabs, (initialTabs: Tab[]) => initTabsSelection(initialTabs),
    );

    function selectTabByIndex(tabIndex: number, isPanelSelection: boolean): void {
        const tabToSelect = tabsState[tabIndex];
        setTabsState({ id: tabToSelect.id, isPanelSelection });
    }

    function isLastTabIndex(selectedTabIndex: number): boolean {
        return selectedTabIndex === tabsState.length - 1;
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        let selectedIndex = tabsState.findIndex((tabState) => tabState.isButtonSelected);
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
                const selectedPanelIndex = tabsState.findIndex((tabState) => tabState.isPanelSelected);
                selectTabByIndex(selectedPanelIndex, false);
            } else if (event.key === 'Enter' || event.key === ' ') {
                selectTabByIndex(selectedIndex, true);
            }

            if (['Home', 'End', 'Enter', ' '].includes(event.key)
                || (event.key === 'Tab' && !tabsState[selectedIndex].isPanelSelected)) {
                event.preventDefault();
            }
        }
    }

    return (
        <div className={className}>
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
                        onClick={() => setTabsState({ id: tabState.id, isPanelSelection: true })}
                        onFocus={() => setTabsState({ id: tabState.id, isPanelSelection: false })}
                    >
                        {tabState.tab.title}
                    </TabButton>
                ))}
            </CenteredContentDiv>
            {tabsState.map((tabState, i) => (tabState.shouldRender
                && (
                    <TabPanel
                        id={tabState.panelId}
                        data-testid={`tab-panel-container-${i + 1}`}
                        buttonId={tabState.id}
                        key={tabState.panelId}
                        hidden={!tabState.isPanelSelected}
                    >
                        {tabState.tab.panelContent}
                    </TabPanel>
                )
            ))}
        </div>
    );
}
