import { useEffect } from 'react';
import { eventIsInside } from '../utils/events';

export function useClickOutside(
    targets: (HTMLElement | null)[],
    callback: () => void,
): void {
    useEffect(() => {
        function handleClick(event: MouseEvent): void {
            if (!eventIsInside(event, ...targets)) {
                callback();
            }
        }

        document.addEventListener('mousedown', handleClick);
        return () => document.removeEventListener('mousedown', handleClick);
    }, [callback, targets]);
}
