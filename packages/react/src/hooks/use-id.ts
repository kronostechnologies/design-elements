import React from 'react';

const INITIAL_VALUE = 1;

let lastId = INITIAL_VALUE;

function nextId(localPrefix: string): string {
    return `${localPrefix}${lastId++}`;
}

function usePrevious(value: unknown): unknown {
    const ref = React.useRef<unknown>();
    React.useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export function resetId(): void {
    lastId = INITIAL_VALUE;
}

export function useId(prefix: string): string {
    const idRef = React.useRef<string>(prefix);
    const prevPrefix = usePrevious(prefix);

    if (prevPrefix !== prefix) {
        idRef.current = nextId(prefix);
    }

    return idRef.current;
}
