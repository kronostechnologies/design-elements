import React, { ReactElement, KeyboardEvent, useState, useRef, useCallback, useEffect } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { eventIsInside } from '../../utils/events';
import { IconButton } from '../buttons/icon-button';
import { RouteLink } from '../route-link/route-link';
import { NavMenu, NavMenuOption } from '../nav-menu/nav-menu';

export type BreadcrumbElement = NavMenuOption;

interface BreadcrumbProps {
    className?: string;
    history: BreadcrumbElement[];
}

const StyledOL = styled.ol`
    margin: 0;
    padding: 0;
`;

const StyledLi = styled.li`
    display: inline-block;
    position: relative;

    & > a {
        text-decoration: underline;
    }

    &:not(:last-child)::after {
        content: "/";
        margin: 0 var(--spacing-1x);
    }
`;

const StyledNavMenu = styled(NavMenu)`
    max-width: 350px;
    width: initial;
`;

const StyledIconButton = styled(IconButton)`
    vertical-align: middle;
`;

export function Breadcrumb({ className, history }: BreadcrumbProps): ReactElement {
    const [isOpen, setOpen] = useState(false);
    const [focusedValue, setFocusedValue] = useState('');

    const firstRoute = history[0];
    const lastRoute = history[history.length - 1];

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
        if (history.length > 0) {
            setFocusedValue(isOpen ? history[1].value : '');
        }
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside, isOpen, history]);

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
        <nav aria-label="breadcrumb" className={className} ref={navRef}>
            <StyledOL>
                {history.length > 1 && (
                    <StyledLi>
                        <RouteLink
                            data-testid={`breadcrumb-link-${firstRoute.value}`}
                            href={firstRoute.href}
                            routerLink={Link}
                            label={firstRoute.label}
                        />
                    </StyledLi>
                )}
                {history.length > 2 && (
                    <StyledLi>
                        <StyledIconButton
                            ref={buttonRef}
                            aria-expanded={isOpen}
                            type="button"
                            data-testid="ellipse-button"
                            buttonType="tertiary"
                            iconName="moreHorizontal"
                            label="breadcrumb-list"
                            onClick={() => setOpen(!isOpen)}
                        />
                        <StyledNavMenu
                            ordered
                            data-testid="nav-menu"
                            ref={navMenuRef}
                            hidden={!isOpen}
                            focusedValue={focusedValue}
                            onChange={() => setOpen(false)}
                            onKeyDown={handleNavMenuKeyDown}
                            options={history.filter((route) => route !== firstRoute && route !== lastRoute)}
                        />
                    </StyledLi>
                )}
                {lastRoute && <StyledLi>{lastRoute.label}</StyledLi>}
            </StyledOL>
        </nav>
    );
}
