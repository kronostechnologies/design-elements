import { RefObject, useState } from 'react';
import { NavMenuOption } from '../nav-menu/nav-menu-option';
import { Overflow, useBreadcrumbOverflow } from './use-breadcrumb-overflow';
import { useBreadcrumbLayoutEffect } from './use-breadcrumb-layout-effect';

interface BreadcrumbRoutes {
    shownRoutes: NavMenuOption[],
    hiddenRoutes: NavMenuOption[],
    overflow: Overflow
}

export function useBreadcrumbRoutes(
    history: NavMenuOption[],
    navRef: RefObject<HTMLDivElement>,
): BreadcrumbRoutes {
    const [shownRoutes, setShownedRoutes] = useState<NavMenuOption[]>(history);
    const [hiddenRoutes, setHiddenRoutes] = useState<NavMenuOption[]>([]);

    const overflow = useBreadcrumbOverflow({
        navRef,
        hiddenRoutes,
        shownRoutes,
    });

    useBreadcrumbLayoutEffect({
        overflow,
        shownRoutes,
        history,
        setHiddenRoutes,
        setShownRoutes: setShownedRoutes,
    });

    return {
        shownRoutes,
        hiddenRoutes,
        overflow,
    };
}
