import { useLayoutEffect } from 'react';
import { Overflow } from '../../hooks/use-overflow';
import { NavListOption } from '../nav-list/nav-list-option';

interface UseBreadcrumbLayoutEffectRequest {
    overflow: Overflow;
    shownRoutes: NavListOption[];
    history: NavListOption[];
    setHiddenRoutes: (value: (((prevState: NavListOption[]) => NavListOption[]) | NavListOption[])) => void;
    setShownRoutes: (value: (((prevState: NavListOption[]) => NavListOption[]) | NavListOption[])) => void;
}

export function useBreadcrumbLayoutEffect({
    overflow,
    shownRoutes,
    history,
    setHiddenRoutes,
    setShownRoutes,
}: UseBreadcrumbLayoutEffectRequest): void {
    useLayoutEffect(() => {
        if (overflow.horizontal && shownRoutes.length > 0) {
            const lastRoute = history[history.length - 1];
            const hiddenStartIndex = Math.max(0, shownRoutes.length - 2);
            const newHiddenRoutes = history.slice(hiddenStartIndex, history.length - 1);
            const shownEndIndex = Math.max(shownRoutes.length - 2, 0);
            const newShownRoutes = history.slice(0, shownEndIndex);

            if (newShownRoutes.length > 0) {
                newShownRoutes.push(lastRoute);
            } else {
                newHiddenRoutes.push(lastRoute);
            }

            setHiddenRoutes(newHiddenRoutes);
            setShownRoutes(newShownRoutes);
        }
    }, [setShownRoutes, overflow.horizontal, history, shownRoutes.length, setHiddenRoutes, shownRoutes]);
}
