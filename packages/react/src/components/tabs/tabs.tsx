import {
    createRef,
    KeyboardEvent,
    ReactNode,
    RefObject,
    useCallback,
    useMemo,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled, { css } from 'styled-components';
import { useScrollable } from '../../hooks/use-scrollable';
import { useTranslation } from '../../i18n/use-translation';
import { getNextElement, getPreviousElement } from '../../utils/array';
import { Icon, IconName } from '../icon/icon';
import { Tooltip } from '../tooltip/tooltip';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';
import { Button } from '../buttons/button';

const TabsWrapper = styled.div<{ $global?: boolean; }>`
    ${({ theme, $global }) => !$global && css`
        background: ${theme.component['tab-section-background-color']};
        border: 1px solid ${theme.component['tab-section-border-color']};
        border-radius: var(--border-radius-2x);
        box-shadow: 0 1px 4px 0 ${theme.component['tab-section-box-shadow-color']};
    `};
`;

const TabButtonsContainer = styled.div<{ $global?: boolean; }>`
    /* stylelint-disable-next-line @stylistic/declaration-bang-space-before */
    background: ${({ theme, $global }) => ($global ? theme.component['tab-global-list-background-color'] : theme.component['tab-section-list-background-color'])};
    border-radius: ${({ $global }) => !$global && 'var(--border-radius-2x) var(--border-radius-2x) 0 0'};
    box-sizing: content-box;
    height: var(--size-2halfx);
    padding-top: ${({ $global }) => $global && 'var(--spacing-2x)'};
    position: relative;

    &::before {
        border-bottom: 1px solid ${({ theme }) => theme.component['tab-border-bottom-color']};
        bottom: 0;
        content: '';
        display: block;
        height: 1px;
        position: absolute;
        width: 100%;
    }
`;

const TabButtonsList = styled.div<{ $global?: boolean; }>`
    border-radius: ${({ $global }) => !$global && 'var(--border-radius-2x) var(--border-radius-2x) 0 0'};
    display: flex;
    gap: var(--spacing-half);
    height: var(--size-2halfx);
    overflow-x: auto;
    overflow-y: hidden;
    padding: ${({ $global }) => !$global && '0 var(--spacing-2x)'};
    scrollbar-width: none;
    white-space: nowrap;
`;

const ScrollButton = styled(Button) <{ $global?: boolean; $position: 'left' | 'right'; }>`
    align-items: center;
    background: ${({ theme, $global }) => theme.component[`tab-${$global ? 'global' : 'section'}-list-background-color`]};
    border-bottom: 1px solid ${({ theme }) => theme.component['tab-border-bottom-color']};
    border-radius: 0;
    bottom: 0;
    display: inline-flex;
    height: var(--size-2halfx);
    min-height: auto;
    position: absolute;
    z-index: 1;

    &:hover {
        background: ${({ theme }) => theme.component['tab-scroll-button-hover-background-color']};
    }

    ${({ $position, $global }) => $position === 'left' && css`
        box-shadow: 3px 0px 3px -2px rgba(0, 0, 0, 0.1);
        left: 0;
        padding: 0 var(--spacing-1x) 0 var(--spacing-2x);

        ${!$global && css`
            border-radius: var(--border-radius-2x) 0 0 0;
        `};
    `};

    ${({ $position, $global }) => $position === 'right' && css`
        box-shadow: -3px 0px 3px -2px rgba(0, 0, 0, 0.1);
        padding: 0 var(--spacing-2x) 0 var(--spacing-1x);
        right: 0;

        ${!$global && css`
            border-radius: 0 var(--border-radius-2x) 0 0;
        `};
    `};

    &.hidden {
        display: none;
    }
`;

const AddButton = styled(Button)`
    align-self: center;
    min-width: auto;
    white-space: nowrap;
`;

export interface Tab {
    id: string;
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

interface AddButtonProps {
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    tooltipContent?: string;
    onClick(): void;
}

interface Props {
    className?: string;
    forceRenderTabPanels?: boolean;
    global?: boolean;
    tabs: Tab[];
    defaultSelectedId?: string;
    addButton?: AddButtonProps;
    onRemove?(tabId: string): void;
    /**
     * If provided, Tabs is controlled.
     */
    activeTabId?: string;
    /**
     * Callback when the active tab changes. Called only in controlled mode.
     */
    onTabChange?(tabId: string): void;
}

export const Tabs: VoidFunctionComponent<Props> = ({
    className,
    global,
    forceRenderTabPanels,
    tabs,
    defaultSelectedId,
    addButton: providedAddButtonProps,
    onRemove,
    activeTabId,
    onTabChange,
}) => {
    const { t } = useTranslation('tabs');
    const tabsListRef = createRef<HTMLDivElement>();
    const scrollLeftButtonRef = createRef<HTMLButtonElement>();
    const scrollRightButtonRef = createRef<HTMLButtonElement>();

    const addButtonProps = {
        label: t('addTab'),
        disabled: false,
        loading: false,
        tooltipContent: null,
        ...providedAddButtonProps,
    };
    const addButtonComponent = providedAddButtonProps && (
        <AddButton
            type="button"
            buttonType="tertiary"
            leftIconName="plusSign"
            label={addButtonProps.label}
            disabled={addButtonProps.disabled}
            loading={addButtonProps.loading}
            onClick={addButtonProps.onClick}
        />
    );

    const { scrollToLeft, scrollToRight } = useScrollable({
        scrollableElement: tabsListRef,
        scrollByPercent: 0.6,
        onScroll: ({ atStartX, atEndX }) => {
            scrollLeftButtonRef.current?.classList.toggle('hidden', atStartX);
            scrollRightButtonRef.current?.classList.toggle('hidden', atEndX);
        },
    });

    const tabItems: TabItem[] = useMemo((): TabItem[] => tabs.map(
        (tab) => ({
            ...tab,
            id: tab.id,
            panelId: `${tab.id}-panel`,
            buttonRef: createRef<HTMLButtonElement>(),
        }),
    ), [tabs]);

    const defaultSelectedTab = tabItems.find((tab) => tab.id === defaultSelectedId);
    const [uncontrolledSelectedTab, setUncontrolledSelectedTab] = useState<TabItem | undefined>(
        defaultSelectedTab ?? tabItems[0],
    );
    const controlled = activeTabId !== undefined && onTabChange !== undefined;
    const activeTabItem = tabItems.find((tab) => tab.id === activeTabId);
    const selectedTab = (controlled && activeTabItem) || uncontrolledSelectedTab;

    function isTabSelected(tabId: string): boolean {
        return selectedTab?.id === tabId;
    }

    const handleRemoveTab = useCallback((tabId: string) => {
        if (selectedTab?.id === tabId) {
            const tabIndex = tabItems.findIndex((tab) => tab.id === tabId);
            const nextSelectedTab = tabItems[tabIndex + 1] ?? tabItems[tabIndex - 1];

            if (nextSelectedTab) {
                nextSelectedTab.buttonRef.current?.focus();
                if (!controlled) {
                    setUncontrolledSelectedTab(nextSelectedTab);
                }
            }
        }

        onRemove?.(tabId);
    }, [selectedTab?.id, onRemove, tabItems, controlled]);

    async function handleTabSelected(tabItem: TabItem): Promise<void> {
        if (selectedTab?.onBeforeUnload) {
            const isConfirmed = await selectedTab.onBeforeUnload();
            if (isConfirmed) {
                if (controlled) {
                    onTabChange?.(tabItem.id);
                } else {
                    setUncontrolledSelectedTab(tabItem);
                }
            }
        } else if (controlled) {
            onTabChange?.(tabItem.id);
        } else {
            setUncontrolledSelectedTab(tabItem);
        }
    }

    function handleButtonKeyDown(event: KeyboardEvent<HTMLDivElement>, currentlyFocusedTab: TabItem): void {
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
        <TabsWrapper $global={global} className={className}>
            <TabButtonsContainer $global={global}>
                <ScrollButton
                    className="hidden"
                    buttonType="tertiary"
                    type="button"
                    aria-hidden="true"
                    onClick={() => scrollToLeft()}
                    $position="left"
                    $global={global}
                    ref={scrollLeftButtonRef}
                >
                    <Icon name='chevronLeft' size='16' aria-hidden="true" focusable={false} />
                </ScrollButton>
                <TabButtonsList
                    role="tablist"
                    aria-label="tabs label"
                    $global={global}
                    ref={tabsListRef}
                >
                    {tabItems.map((tabItem, i) => (
                        <TabButton
                            global={global}
                            id={tabItem.id}
                            panelId={tabItem.panelId}
                            key={tabItem.id}
                            data-testid={`tab-${i + 1}`}
                            leftIcon={tabItem.leftIcon}
                            rightIcon={tabItem.rightIcon}
                            isSelected={isTabSelected(tabItem.id)}
                            ref={tabItem.buttonRef}
                            onClick={() => handleTabSelected(tabItem)}
                            onRemove={onRemove ? () => handleRemoveTab(tabItem.id) : undefined}
                            onKeyDown={(event) => handleButtonKeyDown(event, tabItem)}
                        >
                            {tabItem.title}
                        </TabButton>
                    ))}
                    {addButtonComponent && (
                        addButtonProps.tooltipContent ? (
                            <Tooltip label={addButtonProps.tooltipContent} desktopPlacement="top">
                                {addButtonComponent}
                            </Tooltip>
                        ) : addButtonComponent
                    )}
                </TabButtonsList>
                <ScrollButton
                    className="hidden"
                    buttonType="tertiary"
                    type="button"
                    aria-hidden="true"
                    onClick={() => scrollToRight()}
                    $position="right"
                    $global={global}
                    ref={scrollRightButtonRef}
                >
                    <Icon name='chevronRight' size='16' aria-hidden="true" focusable={false} />
                </ScrollButton>
            </TabButtonsContainer>
            {tabItems.map((tabItem) => {
                if (forceRenderTabPanels || isTabSelected(tabItem.id)) {
                    return (
                        <TabPanel
                            buttonId={tabItem.id}
                            hidden={!isTabSelected(tabItem.id)}
                            id={tabItem.panelId}
                            key={tabItem.panelId}
                            global={global}
                        >
                            {tabItem.panelContent}
                        </TabPanel>
                    );
                }
                return null;
            })}
        </TabsWrapper>
    );
};

Tabs.displayName = 'Tabs';
