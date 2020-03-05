import { Dispatch, SetStateAction, useEffect, useState } from 'react';

export function useStateCallback<S>(
    initialState?: S | (() => S),
    callback?: (value?: S) => void,
): [S | undefined, Dispatch<SetStateAction<S | undefined>>] {
    const [state, setState] = useState<S | undefined>(initialState);

    if (callback) {
        useEffect(() => callback(state), [state]);
    }

    return [state, setState];
}
