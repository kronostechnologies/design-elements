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
import { Icon } from '../icon/icon';

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
}

const Button = styled.button<ButtonProps>`
    align-items: center;
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: flex;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    justify-content: space-between;
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    padding: ${({ $hasSubMenu }) => ($hasSubMenu ? '0 var(--spacing-half) 0 var(--spacing-2x)' : '0 var(--spacing-2x)')};
    text-align: left;
    text-decoration: none;
    width: 100%;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

const Label = styled.span`
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
`;

const StyledIcon = styled(Icon)`
    min-width: 16px;
`;

export interface MenuOption {
    label: string;
    options?: MenuOption[];
    onClick?(): void;
}

interface ListOption extends MenuOption {
    focusIndex: number,
    options?: ListOption[];
    ref: RefObject<HTMLButtonElement>,
}

interface Props {
    className?: string;
    id?: string;
    initialFocusIndex?: number;
    numberOfVisibleItems?: number;
    options: MenuOption[];

    onKeyDown?(event: KeyboardEvent): void;
    onOptionSelect?(option: ListOption): void;
}

function getListOptions(options: MenuOption[]): ListOption[] {
    return options.map(
        (option, index) => ({
            ...option,
            focusIndex: index,
            ref: createRef<HTMLButtonElement>(),
            options: option.options ? getListOptions(option.options) : undefined,
        }),
    );
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
    const list: ListOption[] = useMemo((): ListOption[] => getListOptions(options), [options]);
    const [focusedIndex, setFocusedIndex] = useState(initialFocusIndex);
    const [activeMenuList, setActiveMenuList] = useState(list);
    const [isMouseNavigating, setMouseNavigating] = useState(false);

    const focusElementAtIndex = useCallback((index: number): void => {
        activeMenuList[index]?.ref.current?.focus();
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

        if (isLetterOrNumber(event.key)) {
            const firstMatchingOption = activeMenuList.find((option) => option.label
                .toLowerCase()
                .startsWith(event.key.toLowerCase()));

            firstMatchingOption?.ref.current?.focus();
        }

        switch (event.key) {
            case 'ArrowUp': {
                event.preventDefault();
                const previousElement = getPreviousElementInArray(activeMenuList, focusedIndex);
                if (previousElement) {
                    setFocusedIndex(previousElement.focusIndex);
                }
                break;
            }
            case 'ArrowDown': {
                event.preventDefault();
                const nextElement = getNextElementInArray(activeMenuList, focusedIndex);
                if (nextElement) {
                    setFocusedIndex(nextElement.focusIndex);
                }
                break;
            }
            case 'ArrowRight': {
                event.preventDefault();
                const subMenu = activeMenuList[focusedIndex].options;

                if (subMenu) {
                    setActiveMenuList(subMenu);
                    setFocusedIndex(0);
                }
                break;
            }
            case 'ArrowLeft': {
                event.preventDefault();
                const isSubMenu = list !== activeMenuList;
                const parentOption = list.find((option) => option.options === activeMenuList);

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

    function renderOptions(listOptions: ListOption[]): ReactElement {
        const isSubMenu = listOptions !== list;
        const getTestId = (index: number): string => (isSubMenu ? `sub-menu-option-${index}` : `menu-option-${index}`);

        return (
            <>
                {listOptions.map((opt, index) => (
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
                                {renderOptions(opt.options)}
                            </SubMenu>
                        )}
                    </Fragment>
                ))}
            </>
        );
    }

    return (
        <div
            ref={ref}
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
        >
            <StyledDiv
                className={className}
                data-testid="menu"
                id={menuId}
                numberOfVisibleItems={numberOfVisibleItems}
                onKeyDown={handleKeyDown}
                role="menu"
            >
                {renderOptions(list)}
            </StyledDiv>
        </div>
    );
});
