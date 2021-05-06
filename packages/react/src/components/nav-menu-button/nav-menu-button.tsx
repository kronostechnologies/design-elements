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
import { Theme } from '../../themes';
import { eventIsInside } from '../../utils/events';
import { v4 as uuid } from '../../utils/uuid';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { NavMenu, NavMenuOption } from '../nav-menu/nav-menu';
import { getRootDocument } from '../../utils/dom';

const StyledNav = styled.nav`
    position: relative;
`;

interface StyledButtonProps {
    theme: Theme;
    expanded: boolean;
}

const StyledButton = styled(AbstractButton)<StyledButtonProps>`
    background-color: ${({ expanded, theme }) => (expanded ? theme.main['primary-3'] : 'transparent')};
    border-color: transparent;
    color: ${({ theme }) => theme.greys.white};
    font-size: 0.875rem;
    font-weight: var(--font-normal);
    text-transform: unset;

    &:hover {
        background-color: ${({ theme }) => theme.main['primary-3']};
    }
`;

const StyledIcon = styled(Icon)`
    margin-left: var(--spacing-1x);
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
    children: ReactNode;
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
    hasIcon?: boolean;
    id?: string;
    options: NavMenuOption[];
}

export function NavMenuButton({
    ariaLabel,
    children,
    className,
    defaultOpen = false,
    hasIcon = true,
    id: providedId,
    options,
}: MenuButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const id = useMemo(() => providedId || uuid(), [providedId]);
    const [focusedValue, setFocusedValue] = useState('');
    const [isOpen, setOpen] = useState(defaultOpen);
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

    function handleNavMenuKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
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
    }

    return (
        <StyledNav ref={navRef} className={className} id={id} aria-label={ariaLabel || t('ariaLabel')}>
            <StyledButton
                aria-expanded={isOpen}
                data-testid="menu-button"
                expanded={isOpen}
                isMobile={isMobile}
                onClick={() => setOpen(!isOpen)}
                ref={buttonRef}
                type="button"
            >
                {children}
                {hasIcon && <StyledIcon aria-hidden="true" name={isOpen ? 'chevronUp' : 'chevronDown'} size="16" />}
            </StyledButton>
            <StyledNavMenu
                data-testid="menu-navMenu"
                focusedValue={focusedValue}
                onChange={() => setOpen(false)}
                onKeyDown={handleNavMenuKeyDown}
                options={options}
                ref={navMenuRef}
                hidden={!isOpen}
            />
        </StyledNav>
    );
}
