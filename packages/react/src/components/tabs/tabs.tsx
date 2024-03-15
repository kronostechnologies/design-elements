import {
    createRef,
    KeyboardEvent,
    ReactNode,
    RefObject,
    useEffect,
    useMemo,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { getNextElement, getPreviousElement } from '../../utils/array';
import { v4 as uuid } from '../../utils/uuid';
import { Icon, IconName } from '../icon/icon';
import { TabButton } from './tab-button';
import { TabPanel } from './tab-panel';
import { Button } from '../buttons/button';

const TabButtonsContainer = styled.div<{ $global?: boolean; }>`
    /* stylelint-disable-next-line @stylistic/declaration-bang-space-before */
    background: ${({ theme, $global }) => (!$global && theme.greys['light-grey'])};
    border-radius: ${({ $global }) => !$global && 'var(--border-radius-2x) var(--border-radius-2x) 0 0'};
    box-sizing: content-box;
    height: var(--size-2halfx);
    padding-top: ${({ $global }) => $global && 'var(--spacing-2x)'};
    position: relative;

    &::before {
        border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
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

const ScrollButton = styled(Button)<{ $global?: boolean; $position: 'left' | 'right' }>`
    align-items: center;
    /* stylelint-disable-next-line @stylistic/declaration-bang-space-before */
    background: ${({ $global, theme }) => (!$global ? theme.greys['light-grey'] : theme.greys.white)};
    border-bottom: 1px solid ${({ theme }) => theme.greys.grey};
    border-radius: 0;
    bottom: 0;
    display: inline-flex;
    height: var(--size-2halfx);
    min-height: auto;
    position: absolute;
    z-index: 1;

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

const AddIcon = styled(Icon)`
    margin-right: var(--spacing-half);
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
    const tabsListRef = createRef<HTMLDivElement>();
    const scrollLeftButtonRef = createRef<HTMLButtonElement>();
    const scrollRightButtonRef = createRef<HTMLButtonElement>();

    const tabItems: TabItem[] = useMemo((): TabItem[] => tabs.map(
        (tab, i) => ({
            ...tab,
            id: tab.id ?? `${i}`,
            panelId: uuid(),
            buttonRef: createRef<HTMLButtonElement>(),
        }),
    ), [tabs]);
    const [selectedTab, setSelectedTab] = useState(tabItems[0]);

    useEffect(() => {
        const scrollArea = tabsListRef.current!;

        function handleButtonsVisibility(): void {
            const scrollX = scrollArea.scrollLeft;
            if (scrollLeftButtonRef.current) {
                scrollLeftButtonRef.current.classList.toggle('hidden', scrollX === 0);
            }
            if (scrollRightButtonRef.current) {
                const wholeWidth = scrollArea.scrollWidth;
                const scrollVisibleWidth = scrollArea.offsetWidth;
                const isEndOfScroll = Math.ceil(scrollX) + scrollVisibleWidth >= wholeWidth;
                scrollRightButtonRef.current.classList.toggle('hidden', isEndOfScroll);
            }
        }

        handleButtonsVisibility();

        const resizeObserver = new ResizeObserver(handleButtonsVisibility);
        resizeObserver.observe(scrollArea);
        scrollArea.addEventListener('scroll', handleButtonsVisibility);
        return () => {
            resizeObserver.unobserve(scrollArea);
            scrollArea.removeEventListener('scroll', handleButtonsVisibility);
        };
    }, [tabsListRef, scrollLeftButtonRef, scrollRightButtonRef]);

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

    const handleScroll = (dir: 'left' | 'right') => () => {
        if (!tabsListRef.current) {
            return;
        }

        const scrollVisibleWidth = tabsListRef.current.offsetWidth;
        const moveBy = scrollVisibleWidth * 0.5;
        const currentPosX = tabsListRef.current.scrollLeft;
        const newPosX = dir === 'left' ? currentPosX - moveBy : currentPosX + moveBy;

        tabsListRef.current.scrollTo({ left: newPosX, behavior: 'smooth' });
    };

    return (
        <div className={className}>
            <TabButtonsContainer $global={global}>
                <ScrollButton
                    className="hidden"
                    buttonType="tertiary"
                    type="button"
                    aria-hidden="true"
                    onClick={handleScroll('left')}
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
                        <AddButton buttonType='tertiary' type="button" onClick={onAddTab}>
                            <AddIcon name="plusSign" size='16' aria-hidden="true" focusable={false} />
                            {t('addTabs')}
                        </AddButton>
                    )}
                </TabButtonsList>
                <ScrollButton
                    className="hidden"
                    buttonType="tertiary"
                    type="button"
                    aria-hidden="true"
                    onClick={handleScroll('right')}
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
                            contained={contained && !global}
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
        </div>
    );
};
