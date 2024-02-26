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
import { useTranslation } from '../../i18n/use-translation';
import { focus } from '../../utils/css-state';
import { getNextElement, getPreviousElement } from '../../utils/array';
import { v4 as uuid } from '../../utils/uuid';
import { IconName } from '../icon/icon';
import { StyledButtonIcon, TabButton } from './tab-button';
import { TabPanel } from './tab-panel';

const TabButtonsContainer = styled.div<{ $isGlobal?: boolean; }>`
    /* stylelint-disable-next-line @stylistic/declaration-bang-space-before */
    background: ${({ theme, $isGlobal }) => (!$isGlobal && theme.greys['light-grey'])};
    border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
    border-radius: ${({ $isGlobal }) => !$isGlobal && 'var(--border-radius-2x) var(--border-radius-2x) 0 0'};
    box-sizing: border-box;
    display: flex;
    gap: var(--spacing-half);
    min-height: var(--size-2halfx);
    padding: ${({ $isGlobal }) => ($isGlobal ? '0' : '0 0 0 var(--spacing-4x)')};
`;

const StyledAddButton = styled.button`
    align-items: center;
    align-self: center;
    color: #60666e;
    display: flex;
    font-size: 0.75rem;
    font-weight: var(--font-bold);
    gap: var(--spacing-half);
    margin-bottom: -1px;
    padding: var(--spacing-half) var(--spacing-1x);
    text-transform: uppercase;

    ${focus};
`;

export interface Tab {
    id?: string;
    title: string;
    leftIcon?: IconName;
    rightIcon?: IconName;
    panelContent: ReactNode;
    onDelete?(tabId: string): void;
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
    onAddTab?(): void;
}

export const Tabs: VoidFunctionComponent<Props> = ({
    className, contained, global, forceRenderTabPanels, tabs, onAddTab,
}) => {
    const { t } = useTranslation('tabs');

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
                        data-testid={`tab-button-${i + 1}`}
                        leftIcon={tabItem.leftIcon}
                        rightIcon={tabItem.rightIcon}
                        isSelected={isTabSelected(tabItem.id)}
                        ref={tabItem.buttonRef}
                        onClick={() => handleTabSelected(tabItem)}
                        onDelete={tabItem.onDelete}
                        onKeyDown={(event) => handleButtonKeyDown(event, tabItem)}
                    >
                        {tabItem.title}
                    </TabButton>
                ))}
                {onAddTab && (
                    <StyledAddButton type="button" onClick={onAddTab}>
                        <StyledButtonIcon name="plusSign" size='16' aria-hidden="true" focusable={false} />
                        <span>{t('addTabs')}</span>
                    </StyledAddButton>
                )}
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
                            isGlobal={global}
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
