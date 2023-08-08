import { KeyboardEvent, useCallback, useEffect, useRef, useState, VoidFunctionComponent } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { eventIsInside } from '../../utils/events';
import { IconButton } from '../buttons/icon-button';
import { NavList } from '../nav-list/nav-list';
import { NavListOption } from '../nav-list/nav-list-option';
import { RouteLink } from '../route-link/route-link';
import { useBreadcrumbRoutes } from './use-breadcrumb-routes';

export type BreadcrumbElement = NavListOption;

interface BreadcrumbProps {
    className?: string;
    history: BreadcrumbElement[];
}

const StyledOL = styled.ol`
    margin: 0;
    max-width: 100%;
    padding: 0;
    white-space: nowrap;
`;

const StyledLi = styled.li`
    display: inline-block;
    position: relative;

    & > a {
        text-decoration: underline;
    }

    &:not(:last-child)::after {
        content: '/';
        margin: 0 var(--spacing-1x);
    }
`;

const StyledNavList = styled(NavList)`
    max-width: 350px;
    width: initial;
`;

const StyledIconButton = styled(IconButton)`
    vertical-align: middle;
`;

function truncateLabel(label: string): string {
    if (label.length > 40) {
        return `${label.substring(0, 40)}...`;
    }
    return label;
}

export const Breadcrumb: VoidFunctionComponent<BreadcrumbProps> = ({ className, history }) => {
    const [isOpen, setOpen] = useState(false);
    const [focusedValue, setFocusedValue] = useState('');

    const buttonRef = useRef<HTMLButtonElement>(null);
    const navListRef = useRef<HTMLUListElement>(null);
    const navRef = useRef<HTMLDivElement>(null);
    const {
        shownRoutes,
        hiddenRoutes,
        overflow,
    } = useBreadcrumbRoutes(history, navRef);
    const lastRoute = history[history.length - 1];
    const showLastRoute = !hiddenRoutes.includes(lastRoute);

    const handleClickOutside: (event: MouseEvent) => void = useCallback((event) => {
        const clickIsOutside = !eventIsInside(event, buttonRef.current, navListRef.current);
        const shouldClose = (navListRef.current === null || clickIsOutside) && isOpen;

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

    function handleNavListKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
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

    const showHiddenRoutes = overflow.horizontal || hiddenRoutes.length > 0;
    const leftShownRoutes: NavListOption[] = shownRoutes.slice(0, shownRoutes.length - 1);

    return (
        <nav aria-label="breadcrumb" className={className} ref={navRef}>
            <StyledOL>
                {leftShownRoutes.map((route) => (
                    <StyledLi>
                        <RouteLink
                            data-testid={`breadcrumb-link-${route.value}`}
                            href={route.href}
                            routerLink={Link}
                            label={truncateLabel(route.label ?? '')}
                        />
                    </StyledLi>
                ))}
                {showHiddenRoutes && (
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
                        <StyledNavList
                            ordered
                            data-testid="nav-list"
                            ref={navListRef}
                            hidden={!isOpen}
                            focusedValue={focusedValue}
                            onChange={() => setOpen(false)}
                            onKeyDown={handleNavListKeyDown}
                            options={hiddenRoutes}
                        />
                    </StyledLi>
                )}
                {showLastRoute && <StyledLi>{truncateLabel(lastRoute.label ?? '')}</StyledLi>}
            </StyledOL>
        </nav>
    );
};
