import { RefObject, useLayoutEffect, useState } from 'react';
import { NavListOption } from '../nav-list/nav-list-option';

export interface Overflow {
    vertical: boolean;
    horizontal: boolean;
}

interface UseBreadcrumbOverlowRequest {
    navRef: RefObject<HTMLDivElement>,
    hiddenRoutes: NavListOption[],
    shownRoutes: NavListOption[]
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
