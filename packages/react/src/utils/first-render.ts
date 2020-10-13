import { useEffect, useRef } from 'react';

export function useFirstRender(): boolean {
    const firstRender = useRef(true);

    useEffect(() => {
        firstRender.current = false;
    }, []);

    return firstRender.current;
}
