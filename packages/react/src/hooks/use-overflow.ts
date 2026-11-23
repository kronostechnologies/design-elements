import { RefObject, useCallback, useLayoutEffect, useState } from 'react';

export interface Overflow {
    vertical: boolean;
    horizontal: boolean;
}

export function getOverflow(childElement: HTMLElement, parentElement: HTMLElement): Overflow {
    return {
        vertical: childElement.scrollHeight > childElement.clientHeight
            || childElement.scrollHeight > parentElement.clientHeight,
        horizontal: childElement.scrollWidth > childElement.clientWidth
            || childElement.scrollWidth > parentElement.clientWidth,
    };
}

export function useOverflow(
    childRef: RefObject<HTMLElement>,
    parentRef: RefObject<HTMLElement>,
): Overflow {
    const [overflow, setOverflow] = useState<Overflow>({
        vertical: false,
        horizontal: false,
    });

    const checkOverflow = useCallback(() => {
        const childElement = childRef.current;
        const parentElement = parentRef.current;

        if (childElement && parentElement) {
            setOverflow(getOverflow(childElement, parentElement));
        }
    }, [childRef, parentRef]);

    useLayoutEffect(() => {
        const childElement = childRef.current;
        if (!childElement) {
            return;
        }

        checkOverflow();
        const resizeObserver = new ResizeObserver(checkOverflow);
        resizeObserver.observe(childElement);
        window.addEventListener('resize', checkOverflow);

        return () => {
            window.removeEventListener('resize', checkOverflow);
            resizeObserver.disconnect();
        };
    }, [checkOverflow, childRef]);

    return overflow;
}
