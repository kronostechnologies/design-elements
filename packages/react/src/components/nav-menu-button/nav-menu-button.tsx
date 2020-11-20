import React, { KeyboardEvent, ReactElement, useEffect, useMemo, useRef, useState } from 'react';
import styled from 'styled-components';
import uuid from 'uuid/v4';

import { useTranslation } from '@design-elements/i18n/i18n';
import { AbstractButton } from '../buttons/abstract-button';
import { useDeviceContext } from '../device-context-provider/device-context-provider';
import { Icon } from '../icon/icon';
import { NavMenu, NavMenuOption } from '../nav-menu/nav-menu';
import { Theme } from '../theme-wrapper/theme-wrapper';

const StyledNav = styled.nav`
    position: relative;
    width: fit-content;
`;

const StyledButton = styled(AbstractButton)<StyledButtonProps>`
    background-color: ${({ expanded, theme }) => expanded ? theme.main['primary-3'] : 'transparent'};
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

interface StyledButtonProps {
    theme: Theme;
    expanded: boolean;
}

interface MenuButtonProps {
    /**
     * Sets nav's description
     * @default 'Navigation menu'
     **/
    ariaLabel?: string;
    /**
     * Sets menu open by default
     * @default false
     **/
    defaultOpen?: boolean;
    id?: string;
    label: string;
    options: NavMenuOption[];
}

export function NavMenuButton({
    ariaLabel,
    defaultOpen = false,
    id = useMemo(uuid, []),
    label,
    options,
}: MenuButtonProps): ReactElement {
    const { isMobile } = useDeviceContext();
    const { t } = useTranslation('nav-menu-button');
    const [focusedValue, setFocusedValue] = useState('');
    const [isOpen, setOpen] = useState(defaultOpen);
    const buttonRef = useRef<HTMLButtonElement>(null);
    const navMenuRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        setFocusedValue(isOpen ? options[0].value : '');
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [isOpen, options]);

    function handleClickOutside(event: MouseEvent): void {
        const clickIsOutside = (
            !buttonRef.current?.contains(event.target as Node) &&
            !navMenuRef.current?.contains(event.target as Node)
        );
        const shouldClose = (navMenuRef.current === null || clickIsOutside) && isOpen;

        if (shouldClose) {
            setOpen(false);
        }
    }

    function handleNavMenuKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }

        if (isOpen) {
            setTimeout(() => {
                const isFocusInsideNav = navRef.current?.contains(document.activeElement);

                if (!isFocusInsideNav) {
                    setOpen(false);
                }
            });
        }
    }

    return (
        <StyledNav ref={navRef} id={id} aria-label={ariaLabel || t('ariaLabel')}>
            <StyledButton
                aria-expanded={isOpen}
                data-testid="menu-button"
                expanded={isOpen}
                isMobile={isMobile}
                onClick={() => setOpen(!isOpen)}
                ref={buttonRef}
                type="button"
            >
                {label}
                <StyledIcon name={isOpen ? 'chevronUp' : 'chevronDown'} size="16"/>
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
