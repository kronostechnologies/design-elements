import {
    FC,
    KeyboardEvent,
    MouseEvent as ReactMouseEvent,
    ReactElement,
    RefObject,
    useCallback,
    useEffect,
    useLayoutEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import { createPortal } from 'react-dom';
import { useShadowRoot } from 'react-shadow';
import styled, { css, type SimpleInterpolation } from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useDropdown } from '../../hooks/use-dropdown';
import { useTranslation } from '../../i18n/use-translation';
import { focus } from '../../utils/css-state';
import { activeElementIsInside, getRootElement } from '../../utils/dom';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AvatarProps } from '../avatar';
import { Button, type ButtonSize, type ButtonType, IconButton } from '../buttons';
import { useDeviceContext } from '../device-context-provider';
import { DropdownMenu, type GroupItemProps } from '../dropdown-menu';
import { Icon, type IconProps } from '../icon';
import { dropdownMenuButtonClasses } from './dropdown-menu-button-classes';

const StyledDiv = styled.div`
    position: relative;
    ${focus};
`;

const StyledButton = styled(Button)<{ isMobile: boolean }>`
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    min-width: inherit;
    text-transform: unset;
    width: inherit;
`;

const StyledRightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

export interface BaseDropdownProps {
    contentWidth?: number;
}

interface StyledListboxProps {
    $left?: number | string;
    $referenceWidth?: number | undefined;
    $top?: number | string;
    $width?: BaseDropdownProps['contentWidth'];
}

function getWidthStyles({ $width, $referenceWidth }: StyledListboxProps): SimpleInterpolation {
    return css`
        min-width: ${$referenceWidth ? `${$referenceWidth}px` : null};
        width: ${$width && `${$width}px`};
    `;
}

export const StyledDropdownMenu = styled(DropdownMenu)<StyledListboxProps>`
    left: ${({ $left }) => $left};
    position: absolute;
    top: ${({ $top }) => $top};
    width: auto;
    z-index: 99998;

    ${getWidthStyles};
`;

export type DropdownMenuCloseFunction = () => void;

export interface DropdownMenuButtonProps extends BaseDropdownProps {
    align?: 'left' | 'right';
    /**
     * Sets nav's description
     * @default 'Menu'
     * */
    ariaLabel?: string;
    buttonAriaLabel?: string;
    buttonType?: ButtonType;
    className?: string;
    /**
     * Sets dropdown menu width.
     * If not set, menu width will be determined by its content or the width of the button, whichever is greater.
     */
    contentWidth?: number;
    /**
     * Sets menu open by default
     * @default false
     * */
    defaultOpen?: boolean;
    disabled?: boolean;
    dropdownMenuId?: string;
    /**
     * Sets chevron icon
     * @default true
     * */
    hasCaret?: boolean;
    firstItemRef?: RefObject<HTMLElement>;
    icon?: ReactElement<IconProps | AvatarProps>;
    id?: string;
    inverted?: boolean;
    label?: string | ReactElement;
    size?: ButtonSize;
    title?: string;
    /** Set wrapper element tag */
    tag?: 'div' | 'nav';

    onMenuVisibilityChanged?(isOpen: boolean): void;

    render?(close: () => void): ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
}

export const DropdownMenuButton: FC<DropdownMenuButtonProps> = ({
    align = 'right',
    ariaLabel,
    buttonAriaLabel,
    buttonType = 'tertiary',
    className,
    contentWidth,
    defaultOpen = false,
    disabled,
    dropdownMenuId,
    firstItemRef,
    hasCaret = true,
    icon,
    id: providedId,
    inverted = true,
    label,
    onMenuVisibilityChanged,
    render,
    tag,
    title,
    size,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [isOpen, setOpen] = useState(defaultOpen);
    const previousOpen = useRef(isOpen);
    const navRef = useRef<HTMLDivElement>(null);
    const isIconOnly = icon && !label && !hasCaret;
    const containerAriaLabel = (tag === 'div' || tag === undefined) ? '' : ariaLabel || t('ariaLabel');
    const dataAttributes = useDataAttributes(otherProps);
    const [initialReferenceWidth, setInitialReferenceWidth] = useState<number | undefined>(undefined);

    const shadowRoot = useShadowRoot();
    const rootElement = getRootElement(shadowRoot);
    const {
        x,
        y,
        refs: { reference: buttonRef, floating: navMenuRef, ...refs },
    } = useDropdown<HTMLButtonElement>({
        open: isOpen,
        placement: align === 'right' ? 'bottom-end' : 'bottom-start',
        width: contentWidth || 'auto',
    });

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navMenuRef.current);
        const shouldClose = (navMenuRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [buttonRef, isOpen, navMenuRef]);

    useLayoutEffect(() => {
        // This needs to be in a useEffect to avoid calling the callback during render
        if (previousOpen.current !== isOpen) {
            if (isOpen) {
                setInitialReferenceWidth(buttonRef.current?.offsetWidth);
            }
            previousOpen.current = isOpen;
            onMenuVisibilityChanged?.(isOpen);
        }
    }, [buttonRef, isOpen, onMenuVisibilityChanged]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [buttonRef, handleClickOutside, isOpen]);

    function handleCurrentFocus(): void {
        setTimeout(() => {
            const isFocusInside = activeElementIsInside(navRef.current) || activeElementIsInside(navMenuRef.current);

            if (!isFocusInside) {
                setOpen(false);
            }
        });
    }

    function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
        if (isOpen && event.key === 'Tab' && !event.shiftKey && activeElementIsInside(buttonRef.current)) {
            event.preventDefault();
            firstItemRef?.current?.focus();
        } else if (isOpen && event.key === 'Tab' && event.shiftKey) {
            setOpen(false);
        }
    }

    function handleButtonClick(event: ReactMouseEvent<HTMLButtonElement>): void {
        const isKeyboardActivated = event.detail === 0;

        if (isKeyboardActivated) {
            setTimeout(() => {
                firstItemRef?.current?.focus();
            });
        }
        setOpen(!isOpen);
    }

    function handleNavMenuKeyDown(event: KeyboardEvent<HTMLDivElement>): void {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }

        if (isOpen) {
            handleCurrentFocus();
        }
    }

    const onClose = useCallback(() => {
        buttonRef.current?.focus();
        setOpen(false);
    }, [buttonRef]);

    return (
        <StyledDiv
            data-testid="dropdown-container"
            as={tag}
            ref={navRef}
            className={className}
            id={id}
            aria-label={containerAriaLabel}
        >
            {!isIconOnly && (
                <StyledButton
                    aria-label={buttonAriaLabel}
                    aria-expanded={isOpen}
                    aria-controls={dropdownMenuId}
                    className={dropdownMenuButtonClasses.button}
                    data-testid="menu-button"
                    disabled={disabled}
                    isMobile={isMobile}
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={refs.setReference}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                    size={size}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                >
                    {icon}
                    {label}
                    {hasCaret && (
                        <StyledRightIcon
                            aria-hidden="true"
                            name={isOpen ? 'chevronUp' : 'chevronDown'}
                            size="16"
                        />
                    )}
                </StyledButton>
            )}

            {isIconOnly && (
                <IconButton
                    iconName="moreHorizontal"
                    aria-label={buttonAriaLabel}
                    aria-expanded={isOpen}
                    aria-controls={dropdownMenuId}
                    className={dropdownMenuButtonClasses.button}
                    data-testid="menu-button"
                    disabled={disabled}
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={refs.setReference}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                    size={size}
                    {...dataAttributes /* eslint-disable-line react/jsx-props-no-spreading */}
                >
                    {icon}
                </IconButton>
            )}

            {isOpen && createPortal(
                <StyledDropdownMenu
                    id={dropdownMenuId}
                    ref={refs.setFloating}
                    data-testid="menu-dropdownMenu"
                    onKeyDown={handleNavMenuKeyDown}
                    $width={contentWidth}
                    $left={`${x}px`}
                    $referenceWidth={initialReferenceWidth}
                    $top={`${y}px`}
                >
                    {render?.(onClose)}
                </StyledDropdownMenu>,
                rootElement,
            )}
        </StyledDiv>
    );
};

DropdownMenuButton.displayName = 'DropdownMenuButton';
