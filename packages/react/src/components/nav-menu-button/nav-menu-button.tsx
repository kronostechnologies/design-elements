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
import styled, { css } from 'styled-components';
import { useTranslation } from '../../i18n/use-translation';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon, IconName } from '../icon/icon';
import { NavMenu, NavMenuOption } from '../nav-menu/nav-menu';
import { getRootDocument } from '../../utils/dom';
import { IconButton } from '../buttons/icon-button';

const StyledNav = styled.nav`
    position: relative;
`;

interface StyledButtonProps {
    expanded: boolean;
}

const buttonColors = css<StyledButtonProps>`
    background-color: ${({ expanded, theme }) => (expanded ? theme.main['primary-3'] : 'transparent')};
    border-color: ${({ expanded, theme }) => (expanded ? theme.main['primary-3'] : 'transparent')};
    color: ${({ theme }) => theme.greys.white};

    &:hover {
        background-color: ${({ theme }) => theme.main['primary-3']};
        border-color: ${({ theme }) => theme.main['primary-3']};
    }
`;

const StyledButton = styled(AbstractButton)<StyledButtonProps>`
    ${buttonColors}

    font-size: 0.875rem;
    font-weight: var(--font-normal);
    text-transform: unset;
`;

const StyledIconButton = styled(IconButton).attrs({ buttonType: 'primary' })<StyledButtonProps>`
    ${buttonColors}
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
        if (options.length > 0) {
            setFocusedValue(isOpen ? options[0].value : '');
        }
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside, isOpen, options]);

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

    return (
        <StyledNav ref={navRef} className={className} id={id} aria-label={ariaLabel || t('ariaLabel')}>
            {!iconOnly && (
                <StyledButton
                    aria-expanded={isOpen}
                    data-testid="menu-button"
                    expanded={isOpen}
                    isMobile={isMobile}
                    onClick={handleButtonClick}
                    ref={buttonRef}
                    type="button"
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
                <StyledIconButton
                    aria-expanded={isOpen}
                    data-testid="menu-button"
                    expanded={isOpen}
                    iconName={iconName}
                    onClick={handleButtonClick}
                    ref={buttonRef}
                    type="button"
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
