import { RefObject, useLayoutEffect, useState } from 'react';
import { NavMenuOption } from '../nav-menu/nav-menu-option';

export interface Overflow {
    vertical: boolean;
    horizontal: boolean;
}

interface UseBreadcrumbOverlowRequest {
    navRef: RefObject<HTMLDivElement>,
    hiddenRoutes: NavMenuOption[],
    shownRoutes: NavMenuOption[]
}

export function useBreadcrumbOverflow({
    navRef,
    hiddenRoutes,
    shownRoutes,
}: UseBreadcrumbOverlowRequest): Overflow {
    const [overflow, setOverflow] = useState<Overflow>({
        vertical: false,
        horizontal: false,
    });

    useLayoutEffect(() => {
        const { current } = navRef;

        const trigger = (): void => {
            if (current) {
                const verticalOverflow = current.offsetHeight < current.scrollHeight;
                const horizontalOverflow = current.offsetWidth < current.scrollWidth;
                setOverflow({ vertical: verticalOverflow, horizontal: horizontalOverflow });
            }
        };

        if (current) {
            trigger();
        }
    }, [navRef, hiddenRoutes, shownRoutes, setOverflow]);

    return overflow;
}
