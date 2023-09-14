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
import { getNextElementInArray, getPreviousElementInArray } from '../../utils/array';
import { isLetterOrNumber } from '../../utils/regex';
import { v4 as uuid } from '../../utils/uuid';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';

function getMaxHeight(numberOfVisibleItems: number): string {
    const menuOptionHeight = 32;
    const optionsHeight = menuOptionHeight * numberOfVisibleItems;

    return `calc(var(--spacing-half) + ${optionsHeight.toString()}px)`;
}

const StyledDiv = styled.div<{ numberOfVisibleItems: number }>`
    background-color: ${({ theme }) => theme.greys.white};

    /* TODO update with next thematization */
    border: 1px solid #878f9a;
    border-radius: var(--border-radius);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    box-sizing: border-box;
    flex-direction: column;
    margin: 0;
    max-height: ${({ numberOfVisibleItems }) => getMaxHeight(numberOfVisibleItems)};
    overflow-x: hidden;
    overflow-y: auto;
    padding: var(--spacing-half) 0;
    scroll-behavior: smooth;
    width: 100%;
`;

interface SubMenuProps {
    numberOfVisibleItems: number;
    top?: number;
    left?: number;
}

const SubMenu = styled.div<SubMenuProps>`
    background-color: ${({ theme }) => theme.greys.white};

    /* TODO update with next thematization */
    border: 1px solid #878f9a;
    border-radius: var(--border-radius);
    box-shadow: 0 8px 16px 0 rgb(0 0 0 / 10%);
    flex-direction: column;
    left: ${({ left }) => left}px !important;
    margin: 0;
    max-height: ${({ numberOfVisibleItems }) => getMaxHeight(numberOfVisibleItems)};
    overflow-y: auto;
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
    $hasIcon?: boolean;
}

const Button = styled.button<ButtonProps>`
    align-items: center;
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    gap: var(--spacing-1x);
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    padding: ${({ $hasSubMenu }) => ($hasSubMenu ? '0 var(--spacing-half) 0 var(--spacing-2x)' : '0 var(--spacing-2x)')};
    text-align: left;
    text-decoration: none;
    width: 100%;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    &:hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

const GroupLabel = styled.span<{ $device: DeviceContextProps; }>`
    color: #60666e; /* TODO: replace by token neutral/65 */
    display: block;
    font-size: 0.875rem;
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

const NoneIcon = styled.span`
    width: 16px;
`;

const StyledIcon = styled(Icon)`
    width: 16px;
`;

export interface MenuOption {
    label: string;
    iconName?: IconName;
    options?: MenuItem[]; // eslint-disable-line @typescript-eslint/no-use-before-define
    onClick?(): void;
}

export interface MenuGroup {
    groupLabel: string;
    groupOptions: MenuOption[];
}

type MenuItem = MenuGroup | MenuOption;

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
    return (menuItem as MenuGroup).groupLabel !== undefined;
}

function isListGroup(listItem: ListItem): listItem is ListGroup {
    return (listItem as MenuGroup).groupLabel !== undefined;
}

function getAllOptionsInLevel(list: ListItem[]): ListOption[] {
    return list.flatMap((x) => (isListGroup(x) ? x.groupOptions : x));
}

function getListOptions(options: MenuItem[]): ListItem[] {
    const listTree = options.map(
        (option) => (isMenuGroup(option)
            ? ({
                ...option,
                groupOptions: getListOptions(option.groupOptions) as ListOption[],
            })
            : ({
                ...option,
                focusIndex: -1,
                ref: createRef<HTMLButtonElement>(),
                options: option.options ? getListOptions(option.options) : undefined,
            })),
    );

    const setCorrectFocusedIndex = (list: ListItem[]): void => {
        getAllOptionsInLevel(list).forEach((option, index) => {
            if (option.options) {
                setCorrectFocusedIndex(option.options);
            }
            option.focusIndex = index; // eslint-disable-line no-param-reassign
        });
    };
    setCorrectFocusedIndex(listTree);

    return listTree;
}

function getSubMenuTopPosition(parentOption: ListOption): number | undefined {
    const offsetTop = parentOption.ref.current?.offsetTop;
    const parentScrollTop = parentOption.ref.current?.parentElement?.scrollTop;

    if (offsetTop && parentScrollTop) {
        return offsetTop - parentScrollTop;
    }
    return offsetTop;
}

function getSubMenuLeftPosition(parentOption: ListOption): number | undefined {
    return parentOption.ref.current?.offsetWidth;
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
    const list: ListItem[] = useMemo((): ListItem[] => getListOptions(options), [options]);
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
                const previousElement = getPreviousElementInArray(activeMenuOptions, focusedIndex);
                if (previousElement) {
                    setFocusedIndex(previousElement.focusIndex);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                const nextElement = getNextElementInArray(activeMenuOptions, focusedIndex);
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
                            onClick={() => handleOptionClick(opt)}
                            onMouseEnter={() => handleMouseEnter(opt)}
                            onMouseLeave={() => handleMouseLeave(opt)}
                            ref={opt.ref}
                        >
                            {hasAnyOptionWithIcon && (opt.iconName ? (
                                <StyledIcon
                                    focusable={false}
                                    aria-hidden
                                    name={opt.iconName}
                                    size="16"
                                    color='#60666E'
                                />
                            ) : <NoneIcon />)}
                            <Label>{opt.label}</Label>
                            {opt.options && <StyledIcon aria-hidden name="chevronRight" size="16" />}
                        </Button>
                        {opt.options && isSubMenuOpen(opt) && (
                            <SubMenu
                                data-testid={`menu-option-${index}-sub-menu`}
                                id={menuId}
                                numberOfVisibleItems={numberOfVisibleItems}
                                onKeyDown={handleKeyDown}
                                role="menu"
                                onMouseEnter={() => handleMouseEnter(opt)}
                                onMouseLeave={() => handleMouseLeave(opt)}
                                top={getSubMenuTopPosition(opt)}
                                left={getSubMenuLeftPosition(opt)}
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
            numberOfVisibleItems={numberOfVisibleItems}
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
