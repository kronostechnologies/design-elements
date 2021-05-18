import React, {
    createRef,
    KeyboardEvent,
    forwardRef,
    ReactElement,
    Ref,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useState,
} from 'react';
import styled from 'styled-components';
import { DeviceContextProps, useDeviceContext } from '../device-context-provider/device-context-provider';
import { getNextElementInArray, getPreviousElementInArray } from '../../utils/array';

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
    box-shadow: 0 8px 16px 0 rgba(0, 0, 0, 0.1);
    flex-direction: column;
    margin: 0;
    max-height: ${({ numberOfVisibleItems }) => getMaxHeight(numberOfVisibleItems)};
    overflow-y: auto;
    padding: var(--spacing-half) 0;
    position: absolute;
    scroll-behavior: smooth;
    width: 100%;
`;

interface ButtonProps {
    $device: DeviceContextProps;
}

const Button = styled.button<ButtonProps>`
    color: ${({ theme }) => theme.greys.black};
    cursor: pointer;
    display: block;
    font-size: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? '1rem' : '0.875rem')};
    line-height: ${({ $device: { isMobile, isTablet } }) => ((isTablet || isMobile) ? 2.5 : 2)}rem;
    overflow: hidden;
    padding: 0 var(--spacing-2x);
    text-align: left;
    text-decoration: none;
    text-overflow: ellipsis;
    white-space: nowrap;
    width: 100%;

    &:focus {
        box-shadow: ${({ theme }) => theme.tokens['focus-border-box-shadow-inset']};
        outline: none;
    }

    :hover {
        background-color: ${({ theme }) => theme.greys.grey};
    }
`;

export interface MenuOption {
    label: string;
    onClick(): void;
}

interface ListOption extends MenuOption {
    focusIndex: number,
    ref: RefObject<HTMLButtonElement>,
}

interface Props {
    className?: string;
    initialFocusIndex?: number;
    numberOfVisibleItems?: number;
    options: MenuOption[];

    onKeyDown?(event: KeyboardEvent): void;
    onOptionSelect?(): void;
}

export const Menu = forwardRef(({
    className,
    initialFocusIndex = -1,
    numberOfVisibleItems = 4,
    options,
    onKeyDown,
    onOptionSelect,
    ...props
}: Props, ref: Ref<HTMLDivElement>): ReactElement => {
    const [focusedIndex, setFocusedIndex] = useState(initialFocusIndex);
    const device = useDeviceContext();
    const list: ListOption[] = useMemo((): ListOption[] => options.map(
        (option, index) => ({
            ...option,
            focusIndex: index,
            ref: createRef<HTMLButtonElement>(),
        }),
    ), [options]);

    const focusElementAtIndex = useCallback((index: number): void => {
        list[index]?.ref.current?.focus();
    }, [list]);

    const scrollToElementAtIndex = useCallback((index: number): void => {
        list[index]?.ref.current?.scrollIntoView();
    }, [list]);

    useEffect(() => {
        focusElementAtIndex(focusedIndex);
        scrollToElementAtIndex(focusedIndex);
    }, [focusElementAtIndex, scrollToElementAtIndex, focusedIndex]);

    function handleOptionClick(onClick: () => void): void {
        onClick();
        onOptionSelect?.();
    }

    function handleKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        const letterNumber = /^[\p{L}\p{N}]$/iu;

        onKeyDown?.(event);

        if (letterNumber.test(event.key)) {
            const firstMatchingOption = list.find((option) => option.label
                .toLowerCase()
                .startsWith(event.key.toLowerCase()));

            firstMatchingOption?.ref.current?.focus();
        }

        switch (event.key) {
            case 'ArrowUp': {
                const previousElement = getPreviousElementInArray(list, focusedIndex);
                setFocusedIndex(previousElement.focusIndex);
                break;
            }
            case 'ArrowDown': {
                const nextElement = getNextElementInArray(list, focusedIndex);
                setFocusedIndex(nextElement.focusIndex);
                break;
            }
            default: {
                break;
            }
        }
    }

    return (
        <StyledDiv
            className={className}
            data-testid="menu"
            numberOfVisibleItems={numberOfVisibleItems}
            onKeyDown={handleKeyDown}
            ref={ref}
            role="menu"
            /* eslint-disable-next-line react/jsx-props-no-spreading */
            {...props}
        >
            {list.map((opt, index) => (
                <Button
                    data-testid={`menu-option-${index}`}
                    key={opt.label}
                    $device={device}
                    type="button"
                    role="menuitem"
                    tabIndex={-1}
                    onClick={() => handleOptionClick(opt.onClick)}
                    ref={opt.ref}
                >
                    {opt.label}
                </Button>
            ))}
        </StyledDiv>
    );
});
