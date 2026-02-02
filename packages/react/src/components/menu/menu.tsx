import {
    createRef,
    forwardRef,
    Fragment,
    KeyboardEvent,
    ReactElement,
    Ref,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';
import { getNextElement, getPreviousElement } from '../../utils/array';
import { isLetterOrNumber } from '../../utils/regex';
import { v4 as uuid } from '../../utils/uuid';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { focus } from '../../utils/css-state';

function getMaxHeight(numberOfVisibleItems: number): string {
    const menuOptionHeight = 32;
    const optionsHeight = menuOptionHeight * numberOfVisibleItems;

    return `calc(var(--spacing-half) + ${optionsHeight.toString()}px)`;
}

const StyledDiv = styled.div<{ numberOfVisibleItems: number | undefined; }>`
    background-color: ${({ theme }) => theme.component['menu-background-color']};

    border: 1px solid ${({ theme }) => theme.component['menu-border-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 8px 16px 0 ${({ theme }) => theme.component['menu-box-shadow-color']};
    box-sizing: border-box;
    flex-direction: column;
    margin: 0;
    max-height: ${({ numberOfVisibleItems }) => numberOfVisibleItems && getMaxHeight(numberOfVisibleItems)};
    overflow-y: ${({ numberOfVisibleItems }) => numberOfVisibleItems && 'auto'};
    padding: var(--spacing-half) 0;
    scroll-behavior: smooth;
    width: 100%;
`;

interface SubMenuProps {
    numberOfVisibleItems: number | undefined;
    top?: number;
    left?: number;
}

const SubMenu = styled.div<SubMenuProps>`
    background-color: ${({ theme }) => theme.component['menu-submenu-background-color']};

    border: 1px solid ${({ theme }) => theme.component['menu-submenu-border-color']};
    border-radius: var(--border-radius);
    box-shadow: 0 8px 16px 0 ${({ theme }) => theme.component['menu-submenu-box-shadow-color']};
    flex-direction: column;
    left: ${({ left }) => left}px !important;
    margin: 0;
    max-height: ${({ numberOfVisibleItems }) => numberOfVisibleItems && getMaxHeight(numberOfVisibleItems)};
    overflow-y: ${({ numberOfVisibleItems }) => numberOfVisibleItems && 'auto'};
    padding: var(--spacing-half) 0;
    position: absolute;
    scroll-behavior: smooth;
    top: ${({ top }) => top}px !important;
    transform: none !important;
    width: 100%;
`;

interface ButtonProps {
    $device: DeviceContextProps;
    $hasSubMenu: boolean;
    $withEmptyIcon?: boolean;
}

const Button = styled.button<ButtonProps>`
    align-items: center;
    color: ${({ theme }) => theme.component['menu-item-text-color']};
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    gap: var(--spacing-1x);
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    padding: 0 var(--spacing-2x);
    padding-left: ${({ $withEmptyIcon }) => $withEmptyIcon && 'calc(1rem + var(--spacing-3x));'};
    padding-right: ${({ $hasSubMenu }) => $hasSubMenu && 'var(--spacing-half);'};
    text-align: left;
    text-decoration: none;
    width: 100%;

    ${({ theme }) => focus({ theme }, { insideOnly: true })};

    &:hover {
        background-color: ${({ theme }) => theme.component['menu-item-hover-background-color']};
        color: ${({ theme }) => theme.component['menu-item-hover-text-color']};
    }

    &[disabled],
    &[disabled] * {
        color: ${({ theme }) => theme.component['menu-item-disabled-text-color']};
        cursor: default;
        fill: ${({ theme }) => theme.component['menu-item-disabled-text-color']};
        pointer-events: none;
    }
`;

const StyledIcon = styled(Icon)`
    color: ${({ theme }) => theme.component['menu-item-icon-color']};
    &:hover {
        color: ${({ theme }) => theme.component['menu-item-hover-icon-color']};
    }
`;

const GroupLabel = styled.span<{ $device: DeviceContextProps }>`
    color: ${({ theme }) => theme.component['menu-group-text-color']};
    display: block;
    font-size: 0.75rem;
    line-height: 1.25rem;
    overflow: hidden;
    padding: var(--spacing-base) var(--spacing-2x) var(--spacing-half);
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const Label = styled.span`
    flex-grow: 1;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

export interface MenuOption {
    label: string;
    iconName?: IconName;
    options?: MenuItem[]; // eslint-disable-line @typescript-eslint/no-use-before-define
    disabled?: boolean;
    onClick?(): void;
}

export interface MenuGroup {
    groupLabel: string;
    groupOptions: MenuOption[];
}

export type MenuItem = MenuGroup | MenuOption;

interface ListOption extends MenuOption {
    focusIndex: number,
    options?: ListItem[]; // eslint-disable-line @typescript-eslint/no-use-before-define
    ref: RefObject<HTMLButtonElement>,
}

interface ListGroup extends MenuGroup {
    groupOptions: ListOption[];
}

type ListItem = ListGroup | ListOption;

interface Props {
    className?: string;
    id?: string;
    initialFocusIndex?: number;
    numberOfVisibleItems?: number;
    options: MenuItem[];
    $placement?: 'left' | 'right';

    onKeyDown?(event: KeyboardEvent): void;
    onOptionSelect?(option: ListOption): void;
}

function isMenuGroup(menuItem: MenuItem): menuItem is MenuGroup {
    return 'groupLabel' in menuItem && menuItem.groupLabel !== undefined;
}

function isListGroup(listItem: ListItem): listItem is ListGroup {
    return 'groupLabel' in listItem && listItem.groupLabel !== undefined;
}

function getAllOptionsInLevel(list: ListItem[]): ListOption[] {
    return list.flatMap((x) => (isListGroup(x) ? x.groupOptions : x));
}

function getListItems(options: MenuItem[]): ListItem[] {
    const indexCounterPerLevel = new Map<number, number>();

    const generateListTree = (items: MenuItem[], level: number): ListItem[] => items.map(
        (option) => {
            if (isMenuGroup(option)) {
                return ({
                    ...option,
                    groupOptions: generateListTree(option.groupOptions, level) as ListOption[],
                });
            }

            const focusIndex = (indexCounterPerLevel.get(level) ?? -1) + 1;
            indexCounterPerLevel.set(level, focusIndex);

            return ({
                ...option,
                focusIndex,
                ref: createRef<HTMLButtonElement>(),
                options: option.options ? generateListTree(option.options, level + 1) : undefined,
            });
        },
    );

    return generateListTree(options, 0);
}

function getSubMenuPosition(parentOption: ListOption): { top: number, left: number; } {
    const parentButtonPos = parentOption.ref.current!.getBoundingClientRect();
    const parentMenuPos = parentOption.ref.current!.parentElement!.getBoundingClientRect();

    return {
        top: parentButtonPos.top - parentMenuPos.top - 5,
        left: parentButtonPos.right - parentMenuPos.left - 1,
    };
}

export const Menu = forwardRef(({
    className,
    id,
    initialFocusIndex = -1,
    numberOfVisibleItems = 4,
    options,
    onKeyDown,
    onOptionSelect,
    ...props
}: Props, ref: Ref<HTMLDivElement>): ReactElement => {
    const menuId = useMemo(() => id || uuid(), [id]);
    const device = useDeviceContext();
    const list: ListItem[] = useMemo((): ListItem[] => getListItems(options), [options]);
    const [focusedIndex, setFocusedIndex] = useState(initialFocusIndex);
    const [activeMenuList, setActiveMenuList] = useState(list);
    const [isMouseNavigating, setMouseNavigating] = useState(false);

    const focusElementAtIndex = useCallback((index: number): void => {
        getAllOptionsInLevel(activeMenuList)[index]?.ref.current?.focus();
    }, [activeMenuList]);

    useEffect(() => {
        if (!isMouseNavigating) {
            focusElementAtIndex(focusedIndex);
        }
    }, [focusElementAtIndex, focusedIndex, isMouseNavigating]);

    function handleOptionClick(option: ListOption): void {
        option.onClick?.();

        if (option.options) {
            setActiveMenuList(option.options);
            setFocusedIndex(0);
        } else {
            onOptionSelect?.(option);
        }
    }

    function handleMouseEnter(option: ListOption): void {
        if (option.options) {
            setMouseNavigating(true);
            setActiveMenuList(option.options);
        }
    }

    function handleMouseLeave(option: ListOption): void {
        if (option.options) {
            setMouseNavigating(false);
            setActiveMenuList(list);
        }
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        setMouseNavigating(false);
        onKeyDown?.(event);
        const activeMenuOptions = getAllOptionsInLevel(activeMenuList);

        if (isLetterOrNumber(event.key)) {
            const firstMatchingOption = activeMenuOptions.find((option) => option.label
                .toLowerCase()
                .startsWith(event.key.toLowerCase()));

            firstMatchingOption?.ref.current?.focus();
        }

        switch (event.key) {
            case 'ArrowUp': {
                event.preventDefault();
                const previousElement = getPreviousElement(activeMenuOptions, focusedIndex, { wrapAround: true });
                if (previousElement) {
                    setFocusedIndex(previousElement.focusIndex);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                const nextElement = getNextElement(activeMenuOptions, focusedIndex, { wrapAround: true });
                if (nextElement) {
                    setFocusedIndex(nextElement.focusIndex);
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                const subMenu = activeMenuOptions[focusedIndex].options;

                if (subMenu) {
                    setActiveMenuList(subMenu);
                    setFocusedIndex(0);
                }
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                const isSubMenu = list !== activeMenuList;
                const parentOption = getAllOptionsInLevel(list).find((option) => option.options === activeMenuList);

                if (isSubMenu) {
                    setActiveMenuList(list);
                    setFocusedIndex(parentOption ? parentOption.focusIndex : 0);
                }
                break;
            }
            default: {
                break;
            }
        }
    }

    function isSubMenuOpen(opt: ListOption): boolean {
        return opt.options === activeMenuList;
    }

    function renderGroup(group: ListGroup, index: number): ReactElement {
        const groupId = `menu-group-${index}`;

        return (
            <div key={`${groupId}-${group.groupLabel}`} role="group" aria-labelledby={groupId}>
                <GroupLabel $device={device} id={groupId}>{group.groupLabel}</GroupLabel>
                {
                    /* eslint-disable-next-line @typescript-eslint/no-use-before-define */
                    group.groupOptions && renderItems(group.groupOptions)
                }
            </div>
        );
    }

    function renderItems(listItems: ListItem[]): ReactElement {
        const isSubMenu = listItems !== list;
        const getTestId = (index: number): string => (isSubMenu ? `sub-menu-option-${index}` : `menu-option-${index}`);
        const hasAnyOptionWithIcon = listItems.some((opt) => !isListGroup(opt) && opt.iconName != null);

        return (
            <>
                {listItems.map((opt, index) => (isListGroup(opt) ? renderGroup(opt, index) : (
                    <Fragment key={`${menuId}-${opt.label}`}>
                        <Button
                            aria-haspopup={opt.options ? 'menu' : undefined}
                            aria-expanded={opt.options ? activeMenuList === opt.options : undefined}
                            data-testid={getTestId(index)}
                            $device={device}
                            $hasSubMenu={!!opt.options}
                            type="button"
                            role="menuitem"
                            tabIndex={-1}
                            disabled={opt.disabled}
                            onClick={() => handleOptionClick(opt)}
                            onMouseEnter={() => handleMouseEnter(opt)}
                            onMouseLeave={() => handleMouseLeave(opt)}
                            ref={opt.ref}
                            $withEmptyIcon={hasAnyOptionWithIcon && !opt.iconName}
                        >
                            {opt.iconName && (
                                <StyledIcon
                                    focusable={false}
                                    aria-hidden
                                    name={opt.iconName}
                                    size="1rem"
                                />
                            )}
                            <Label>{opt.label}</Label>
                            {opt.options && <Icon aria-hidden name="chevronRight" size="1rem" />}
                        </Button>
                        {opt.options && isSubMenuOpen(opt) && (
                            <SubMenu
                                data-testid={`menu-option-${index}-sub-menu`}
                                id={menuId}
                                numberOfVisibleItems={!getAllOptionsInLevel(listItems).some((o) => o.options != null)
                                    ? numberOfVisibleItems
                                    : undefined}
                                onKeyDown={handleKeyDown}
                                role="menu"
                                onMouseEnter={() => handleMouseEnter(opt)}
                                onMouseLeave={() => handleMouseLeave(opt)}
                                top={getSubMenuPosition(opt).top}
                                left={getSubMenuPosition(opt).left}
                                /* eslint-disable-next-line react/jsx-props-no-spreading */
                                {...props}
                            >
                                {renderItems(opt.options)}
                            </SubMenu>
                        )}
                    </Fragment>
                )))}
            </>
        );
    }

    return (
        <StyledDiv
            className={className}
            data-testid="menu"
            id={menuId}
            numberOfVisibleItems={!getAllOptionsInLevel(list).some((o) => o.options != null)
                ? numberOfVisibleItems
                : undefined}
            onKeyDown={handleKeyDown}
            role="menu"
            ref={ref}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
        >
            {renderItems(list)}
        </StyledDiv>
    );
});

Menu.displayName = 'Menu';
