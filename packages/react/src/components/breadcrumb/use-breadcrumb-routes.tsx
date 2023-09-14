import { RefObject, useState } from 'react';
import { NavListOption } from '../nav-list/nav-list-option';
import { Overflow, useBreadcrumbOverflow } from './use-breadcrumb-overflow';
import { useBreadcrumbLayoutEffect } from './use-breadcrumb-layout-effect';

interface BreadcrumbRoutes {
    shownRoutes: NavListOption[],
    hiddenRoutes: NavListOption[],
    overflow: Overflow
}

export function useBreadcrumbRoutes(
    history: NavListOption[],
    navRef: RefObject<HTMLDivElement>,
): BreadcrumbRoutes {
    const [shownRoutes, setShownedRoutes] = useState<NavListOption[]>(history);
    const [hiddenRoutes, setHiddenRoutes] = useState<NavListOption[]>([]);

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
