import { RefObject, useState } from 'react';
import { type NavListOption } from '../nav-list';
import { useBreadcrumbLayoutEffect } from './use-breadcrumb-layout-effect';
import { type Overflow, useBreadcrumbOverflow } from './use-breadcrumb-overflow';

interface BreadcrumbRoutes {
    shownRoutes: NavListOption[],
    hiddenRoutes: NavListOption[],
    overflow: Overflow
}

export function useBreadcrumbRoutes(
    history: NavListOption[],
    navRef: RefObject<HTMLDivElement>,
): BreadcrumbRoutes {
    const [shownRoutes, setShownRoutes] = useState<NavListOption[]>(history);
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
        setShownRoutes,
    });

    return {
        shownRoutes,
        hiddenRoutes,
        overflow,
    };
}
