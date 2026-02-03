import { type FC, KeyboardEvent, useCallback, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { Link } from 'react-router-dom';
import { useShadowRoot } from 'react-shadow';
import styled from 'styled-components';
import { useDropdown } from '../../hooks/use-dropdown';
import { activeElementIsInside, getRootElement } from '../../utils/dom';
import { eventIsInside } from '../../utils/events';
import { IconButton } from '../buttons';
import { Icon } from '../icon';
import { NavList, type NavListOption } from '../nav-list';
import { RouteLink } from '../route-link';
import { useBreadcrumbRoutes } from './use-breadcrumb-routes';

export type BreadcrumbElement = NavListOption;

export interface BreadcrumbProps {
    className?: string;
    history: BreadcrumbElement[];
}

const StyledOL = styled.ol`
    align-items: center;
    display: inline-flex;
    margin: 0;
    max-width: 100%;
    padding: 0;
    white-space: nowrap;
`;

const StyledLink = styled(RouteLink)`
    color: ${({ theme }) => theme.component['breadcrumb-link-color']};

    &:hover {
        color: ${({ theme }) => theme.component['breadcrumb-link-hover-color']};
    }

    &[disabled] {
        color: ${({ theme }) => theme.component['breadcrumb-link-disabled-color']};
    }
`;

const StyledActiveLink = styled.span`
    align-self: center;
    color: ${({ theme }) => theme.component['breadcrumb-link-active-color']};
    margin: 0 var(--spacing-1x);
`;

const StyledSeparatorIcon = styled(Icon)`
    align-self: center;
    color: ${({ theme }) => theme.component['breadcrumb-separator-color']};
    margin: 0 var(--spacing-1x);
`;

const StyledLi = styled.li`
    align-items: center;
    display: inline-flex;
    position: relative;

    & > a {
        text-decoration: underline;
    }
`;

const StyledListWrapper = styled.div`
    display: inline-block;
    position: relative;
    vertical-align: middle;
    white-space: nowrap;
    z-index: 1;
`;

interface StyledNavListProps {
    $left?: string;
    $top?: string;
}

const StyledNavList = styled(NavList)<StyledNavListProps>`
    left: ${(props) => props.$left};
    max-width: 350px;
    position: absolute;
    top: ${(props) => props.$top};
    width: initial;
    z-index: 99998;
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

export const Breadcrumb: FC<BreadcrumbProps> = ({ className, history }) => {
    const [isOpen, setOpen] = useState(false);
    const navRef = useRef<HTMLDivElement>(null);
    const shadowRoot = useShadowRoot();
    const {
        x,
        y,
        refs: { reference: buttonRef, floating: navListRef, ...refs },
    } = useDropdown<HTMLButtonElement>({ open: isOpen, placement: 'bottom-end' });
    const rootElement = getRootElement(shadowRoot);

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
    }, [buttonRef, isOpen, navListRef]);

    useEffect(() => {
        document.addEventListener('mouseup', handleClickOutside);

        return () => document.removeEventListener('mouseup', handleClickOutside);
    }, [handleClickOutside]);

    function handleNavListKeyDown(event: KeyboardEvent<HTMLInputElement>): void {
        if (event.key === 'Escape') {
            setOpen(false);
            buttonRef.current?.focus();
        }

        if (isOpen) {
            setTimeout(() => {
                const isFocusInsideNav = activeElementIsInside(navListRef.current);

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
                        <StyledLink
                            data-testid={`breadcrumb-link-${route.value}`}
                            href={route.href}
                            routerLink={Link}
                            label={truncateLabel(route.label ?? '')}
                            disabled={route.disabled}
                        />
                        <StyledSeparatorIcon name="chevronRight" size="20" />
                    </StyledLi>
                ))}
                {showHiddenRoutes && (
                    <StyledLi>
                        <StyledListWrapper>
                            <StyledIconButton
                                ref={refs.setReference}
                                aria-expanded={isOpen}
                                type="button"
                                data-testid="ellipse-button"
                                buttonType="tertiary"
                                iconName="moreHorizontal"
                                label="breadcrumb-list"
                                onClick={() => setOpen(!isOpen)}
                            />
                            {isOpen && createPortal(
                                <StyledNavList
                                    ordered
                                    data-testid="nav-list"
                                    ref={refs.setFloating}
                                    onChange={() => setOpen(false)}
                                    onKeyDown={handleNavListKeyDown}
                                    options={hiddenRoutes}
                                    $left={`${x}px`}
                                    $top={`${y}px`}
                                />,
                                rootElement,
                            )}
                        </StyledListWrapper>
                        <StyledSeparatorIcon name="chevronRight" size="20" />
                    </StyledLi>
                )}
                {showLastRoute && (
                    <StyledLi>
                        <StyledActiveLink>
                            {truncateLabel(lastRoute.label ?? '')}
                        </StyledActiveLink>
                    </StyledLi>
                )}
            </StyledOL>
        </nav>
    );
};

Breadcrumb.displayName = 'Breadcrumb';
