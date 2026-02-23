import { createRef, type FC, KeyboardEvent, ReactNode, RefObject, useCallback, useMemo, useState } from 'react';
import styled, { css } from 'styled-components';
import { useScrollable } from '../../hooks/use-scrollable';
import { useTranslation } from '../../i18n/use-translation';
import { getNextElement, getPreviousElement } from '../../utils/array';
import { focus } from '../../utils/css-state';
import { Button } from '../buttons';
import { Icon, IconName } from '../icon';
import { Tooltip } from '../tooltip';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';
import { tabsClasses } from './tabs-classes';
import { TabSize } from './types';

const buttonSize = 'var(--size-2x)';

interface TabsWrapperProps {
    $hasLeftScroll: boolean;
    $hasRightScroll: boolean;
}

const TabTopSection = styled.div`
    display: flex;
    position: relative;
    width: 100%;

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

const TabButtonsContainer = styled.div`
    display: flex;
    grid-area: tabs;
    height: var(--size-2halfx);
    overflow: hidden;
    position: relative;
`;

const TabsWrapper = styled.div<TabsWrapperProps>`
    mask-image:
        linear-gradient(
            90deg,
            ${(props) => (props.$hasLeftScroll
                ? `transparent 0px, transparent ${buttonSize}, #000 ${buttonSize},`
                : '#000 0px,')} #000 calc(100% - ${buttonSize}),
            ${(props) => (props.$hasRightScroll
                ? `transparent calc(100% - ${buttonSize}), transparent 100%` : '#000 100%')}
        );
    overflow: hidden;
`;

const TabList = styled.div`
    display: flex;
    gap: var(--spacing-half);
    height: var(--size-2halfx);
    overflow-x: auto;
    overflow-y: hidden;
    position: relative;
    scrollbar-width: none;
    white-space: nowrap;
`;

const ScrollButton = styled(Button) <{ $position: 'left' | 'right'; }>`
    align-items: center;
    background-color: inherit;
    border-bottom: 1px solid ${({ theme }) => theme.component['tab-border-bottom-color']};
    border-radius: 0;
    bottom: 0;
    display: inline-flex;
    flex-shrink: 0;
    height: var(--size-2halfx);
    min-height: auto;
    padding: 0 var(--spacing-1x);
    position: absolute;
    width: ${buttonSize};
    z-index: 1;

    &:hover {
        background: ${({ theme }) => theme.component['tab-scroll-button-hover-background-color']};
    }

    ${({ theme }) => focus({ theme }, { insideOnly: true })};

    ${({ $position }) => $position === 'left' && css`
        box-shadow: 3px 0 3px -2px rgba(0, 0, 0, 0.1);
        left: 0;
    `};

    ${({ $position }) => $position === 'right' && css`
        box-shadow: -3px 0 3px -2px rgba(0, 0, 0, 0.1);
        right: 0;
    `};

    &.hidden {
        display: none;
    }
`;

const AddButton = styled(Button)`
    align-self: center;
    flex-shrink: 0;
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

export interface AddButtonProps {
    label?: string;
    disabled?: boolean;
    loading?: boolean;
    tooltipContent?: string;
    onClick(): void;
}

export interface TabsProps {
    className?: string;
    forceRenderTabPanels?: boolean;
    size?: TabSize;
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

export const Tabs: FC<TabsProps> = ({
    className,
    size = 'medium',
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

    const [isLeftScrollVisible, setIsLeftScrollVisible] = useState(false);
    const [isRightScrollVisible, setIsRightScrollVisible] = useState(false);

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

            setIsLeftScrollVisible(!atStartX);
            setIsRightScrollVisible(!atEndX);
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
        <div className={className}>
            <TabTopSection className={tabsClasses.tablistContainer}>
                <TabButtonsContainer>
                    <ScrollButton
                        className="hidden"
                        buttonType="tertiary"
                        type="button"
                        aria-hidden="true"
                        onClick={() => scrollToLeft()}
                        $position="left"
                        ref={scrollLeftButtonRef}
                        tabIndex={-1}
                    >
                        <Icon name='chevronLeft' size='16' aria-hidden="true" focusable={false} />
                    </ScrollButton>
                    <TabsWrapper
                        $hasLeftScroll={isLeftScrollVisible}
                        $hasRightScroll={isRightScrollVisible}
                    >
                        <TabList
                            role="tablist"
                            aria-label="tabs label"
                            ref={tabsListRef}
                        >
                            {tabItems.map((tabItem, i) => (
                                <TabButton
                                    size={size}
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
                        </TabList>
                    </TabsWrapper>
                    <ScrollButton
                        className="hidden"
                        buttonType="tertiary"
                        type="button"
                        aria-hidden="true"
                        onClick={() => scrollToRight()}
                        $position="right"
                        ref={scrollRightButtonRef}
                        tabIndex={-1}
                    >
                        <Icon name='chevronRight' size='16' aria-hidden="true" focusable={false} />
                    </ScrollButton>
                </TabButtonsContainer>
                {addButtonComponent && (
                    addButtonProps.tooltipContent && addButtonProps.disabled ? (
                        <Tooltip label={addButtonProps.tooltipContent} desktopPlacement="top">
                            {addButtonComponent}
                        </Tooltip>
                    ) : addButtonComponent
                )}
            </TabTopSection>
            {tabItems.map((tabItem) => {
                if (forceRenderTabPanels || isTabSelected(tabItem.id)) {
                    return (
                        <TabPanel
                            buttonId={tabItem.id}
                            hidden={!isTabSelected(tabItem.id)}
                            id={tabItem.panelId}
                            key={tabItem.panelId}
                            size={size}
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

Tabs.displayName = 'Tabs';
