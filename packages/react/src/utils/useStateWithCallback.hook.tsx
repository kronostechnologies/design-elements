import { useReducer, useRef, useEffect } from 'react';

export function useStateWithCallback<S>(initialState: S, callback: (S) => void): [S, (S) => void] {
    const [state, setState] = useReducer(
        (previousState, newState) => ({ ...previousState, ...newState }),
        initialState,
    );
    const cbRef = useRef<((state: S) => void) | null>(null);

    const setStateCallback = (newState: Partial<S>): void => {
        cbRef.current = callback;
        setState(newState);
    };

    useEffect(() => {
        if (cbRef.current) {
            cbRef.current(state);
            cbRef.current = null;
        }
    }, [state]);

    return [state, setStateCallback];
}
