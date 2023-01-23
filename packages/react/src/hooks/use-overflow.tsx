import { RefObject, useLayoutEffect, useState } from 'react';

export interface Overflow {
    vertical: boolean;
    horizontal: boolean;
}

interface OverflowRequest<T> {
    ref: RefObject<T>;
}

export function useOverflow<T extends HTMLElement>({
    ref,
}: OverflowRequest<T>): Overflow {
    const [overflow, setOverflow] = useState<Overflow>({
        vertical: false,
        horizontal: false,
    });

    useLayoutEffect(() => {
        const { current } = ref;

        const trigger = (): void => {
            if (current) {
                const verticalOverflow = current.offsetHeight < current.scrollHeight;
                const horizontalOverflow = current.offsetWidth < current.scrollWidth;

                setOverflow({
                    vertical: verticalOverflow,
                    horizontal: horizontalOverflow,
                });
            }
        };

        if (current) {
            trigger();
        }
    }, [ref]);

    return overflow;
}
