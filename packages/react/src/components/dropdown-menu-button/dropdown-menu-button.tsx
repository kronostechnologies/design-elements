import {
    KeyboardEvent,
    MouseEvent as ReactMouseEvent,
    ReactElement,
    RefObject,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
    VoidFunctionComponent,
} from 'react';
import styled from 'styled-components';
import { useDataAttributes } from '../../hooks/use-data-attributes';
import { useTranslation } from '../../i18n/use-translation';
import { getRootDocument } from '../../utils/dom';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AvatarProps } from '../avatar/avatar';
import { Button } from '../buttons/button';
import { IconButton } from '../buttons/icon-button';
import { ButtonType } from '../buttons/types';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { DropdownMenu } from '../dropdown-menu/dropdown-menu';
import { GroupItemProps } from '../dropdown-menu/list-items';
import { Icon, IconProps } from '../icon/icon';

const StyledDiv = styled.div`
    position: relative;
`;

const StyledButton = styled(Button)<{ isMobile: boolean }>`
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    text-transform: unset;
`;

const StyledRightIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
`;

export const StyledDropdownMenu = styled(DropdownMenu)`
    max-width: 350px;
    min-width: 200px;
    right: 0;
    width: initial;
`;

interface MenuButtonProps {
    label?: string;
    title?: string;
    /**
     * Sets nav's description
     * @default 'Menu'
     * */
    ariaLabel?: string;
    /** Set wrapper element tag */
    tag?: 'div' | 'nav';
    buttonAriaLabel?: string;
    className?: string;
    /**
     * Sets menu open by default
     * @default false
     * */
    defaultOpen?: boolean;
    /**
     * Sets chevron icon
     * @default true
     * */
    hasCaret?: boolean;
    buttonType?: ButtonType;
    inverted?: boolean;
    icon?: ReactElement<IconProps | AvatarProps>;
    id?: string;
    firstItemRef?: RefObject<HTMLAnchorElement>;
    onMenuVisibilityChanged?(isOpen: boolean): void;
    render?(close: () => void): ReactElement<GroupItemProps> | ReactElement<GroupItemProps>[];
}

export const DropdownMenuButton: VoidFunctionComponent<MenuButtonProps> = ({
    ariaLabel,
    tag,
    buttonAriaLabel,
    buttonType = 'tertiary',
    className,
    defaultOpen = false,
    firstItemRef,
    hasCaret = true,
    icon,
    id: providedId,
    inverted = true,
    label,
    onMenuVisibilityChanged,
    render,
    title,
    ...otherProps
}) => {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [isOpen, setOpen] = useState(defaultOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLDivElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const isIconOnly = icon && !label && !hasCaret;
    const containerAriaLabel = (tag === 'div' || tag === undefined) ? '' : ariaLabel || t('ariaLabel');
    const dataAttributes = useDataAttributes(otherProps);
    const dataTestId = dataAttributes['data-testid'] ?? 'menu-dropdownMenu';

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navMenuRef.current);
        const shouldClose = (navMenuRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        onMenuVisibilityChanged?.(isOpen);
    }, [isOpen, onMenuVisibilityChanged]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);
        const removeEventListenerCallback = (): void => document.removeEventListener('mouseup', handleClickOutside);

        if (!isOpen) {
            return removeEventListenerCallback;
        }

        return removeEventListenerCallback;
    }, [buttonRef, handleClickOutside, isOpen]);

    function handleCurrentFocus(): void {
        setTimeout(() => {
            const focusedElement = getRootDocument(navRef.current)?.activeElement;
            const isFocusInsideNav = navRef.current?.contains(focusedElement || null);

            if (!isFocusInsideNav) {
                setOpen(false);
            }
        });
    }

    function handleButtonKeyDown(event: KeyboardEvent<HTMLButtonElement>): void {
        if (isOpen && event.key === 'Tab') {
            handleCurrentFocus();
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
                    data-testid="menu-button"
                    isMobile={isMobile}
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={buttonRef}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
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
                    data-testid="menu-button"
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={buttonRef}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                >
                    {icon}
                </IconButton>
            )}
            <StyledDropdownMenu
                ref={navMenuRef}
                data-testid={dataTestId}
                onKeyDown={handleNavMenuKeyDown}
                hidden={!isOpen}
            >
                {render?.(() => setOpen(false))}
            </StyledDropdownMenu>
        </StyledDiv>
    );
};

DropdownMenuButton.displayName = 'DropdownMenuButton';
