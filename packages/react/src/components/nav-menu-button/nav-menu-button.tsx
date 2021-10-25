import React, {
    KeyboardEvent,
    ReactElement,
    ReactNode,
    useCallback,
    useEffect,
    useMemo,
    useRef,
    useState,
} from 'react';
import styled from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { NavMenu, NavMenuOption } from '../nav-menu/nav-menu';
import { getRootDocument } from '../../utils/dom';
import { IconButton } from '../buttons/icon-button';
import { Button, ButtonType } from '../buttons/button';

const StyledNav = styled.nav`
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

const StyledLeftIcon = styled(Icon)`
    margin-right: var(--spacing-1x);
`;

const StyledNavMenu = styled(NavMenu)`
    max-width: 350px;
    min-width: 200px;
    right: 0;
    width: initial;
`;

function getFirstFocusableElement(array: NavMenuOption[]): NavMenuOption {
    const focusableElements = array.filter((element) => !element.disabled);
    return focusableElements[0];
}

interface MenuButtonProps {
    /**
     * Sets nav's description
     * @default 'Menu'
     * */
    ariaLabel?: string;
    children?: ReactNode;
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
    iconName?: IconName;
    iconOnly?: boolean;
    id?: string;
    options: NavMenuOption[];
    title?: string;
    buttonType?: ButtonType;
    inverted?: boolean;
    onMenuVisibilityChanged?(isOpen: boolean): void;
    onMenuOptionSelected?(option: NavMenuOption): void;
}

export function NavMenuButton({
    ariaLabel,
    children,
    className,
    defaultOpen = false,
    hasCaret = true,
    iconName,
    iconOnly = false,
    id: providedId,
    options,
    title,
    buttonType = 'tertiary',
    inverted = true,
    onMenuVisibilityChanged,
    onMenuOptionSelected,
}: MenuButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [focusedValue, setFocusedValue] = useState('');
    const [isOpen, setOpen] = useState(defaultOpen);

    useEffect(() => {
        onMenuVisibilityChanged?.(isOpen);
    }, [isOpen, onMenuVisibilityChanged]);

    const buttonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navMenuRef.current);
        const shouldClose = (navMenuRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }, [isOpen]);

    useEffect(() => {
        if (!isOpen) {
            setFocusedValue('');
        }

        document.addEventListener('mouseup', handleClickOutside);

        return () => {
            document.removeEventListener('mouseup', handleClickOutside);
        };
    }, [handleClickOutside, isOpen]);

    const handleNavMenuKeyDown = (event: KeyboardEvent<HTMLInputElement>): void => {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }

        if (isOpen) {
            setTimeout(() => {
                const focusedElement = getRootDocument(navRef.current)?.activeElement;
                const isFocusInsideNav = navRef.current?.contains(focusedElement || null);

                if (!isFocusInsideNav) {
                    setOpen(false);
                }
            });
        }
    };

    const handleOnMenuOptionSelected: (option: NavMenuOption) => void = (option: NavMenuOption) => {
        onMenuOptionSelected?.(option);
        setOpen(false);
    };

    const handleButtonClick = (): void => {
        setOpen(!isOpen);
    };

    const handleButtonKeyDown = (event: KeyboardEvent): void => {
        if ((event.key === 'Enter' || event.key === ' ') && !isOpen) {
            setTimeout(() => {
                const firstFocusableElement = getFirstFocusableElement(options);
                setFocusedValue(firstFocusableElement.value);
            });
        }
    };

    return (
        <StyledNav ref={navRef} className={className} id={id} aria-label={ariaLabel || t('ariaLabel')}>
            {!iconOnly && (
                <StyledButton
                    aria-expanded={isOpen}
                    data-expanded={isOpen}
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
                    {iconName && <StyledLeftIcon aria-hidden="true" name={iconName} size="16" />}
                    {children}
                    {hasCaret && (
                        <StyledRightIcon
                            aria-hidden="true"
                            name={isOpen ? 'chevronUp' : 'chevronDown'}
                            size="16"
                        />
                    )}
                </StyledButton>
            )}
            {iconOnly && iconName && (
                <IconButton
                    aria-expanded={isOpen}
                    data-expanded={isOpen}
                    data-testid="menu-button"
                    iconName={iconName}
                    onClick={handleButtonClick}
                    onKeyDown={handleButtonKeyDown}
                    ref={buttonRef}
                    title={title}
                    type="button"
                    buttonType={buttonType}
                    inverted={inverted}
                />
            )}
            <StyledNavMenu
                data-testid="menu-navMenu"
                focusedValue={focusedValue}
                onChange={handleOnMenuOptionSelected}
                onKeyDown={handleNavMenuKeyDown}
                options={options}
                ref={navMenuRef}
                hidden={!isOpen}
            />
        </StyledNav>
    );
}
