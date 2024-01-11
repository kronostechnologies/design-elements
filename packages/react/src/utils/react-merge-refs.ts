import { type MutableRefObject, type RefCallback } from 'react';

/**
 * Type-aware helper to assign multiple refs to a single element. The refs are
 * wrapped into a RefCallback that can set the value of both RefObjects and other
 * RefCallbacks.
 *
 * Useful when using both local and forwarded refs oh the same element:
 * <Component ref={mergeRefs(forwardedRef, localRef)} />
 */

type MutableRefList<T> = Array<RefCallback<T> | MutableRefObject<T> | undefined | null>;

export function setRefs<T>(val: T, ...refs: MutableRefList<T>): void {
    refs.forEach((ref) => {
        if (typeof ref === 'function') {
            ref(val);
        } else if (ref != null) {
            // eslint-disable-next-line no-param-reassign
            ref.current = val;
        }
    });
}

export function mergeRefs<T>(...refs: MutableRefList<T>): RefCallback<T> {
    return (val: T) => {
        setRefs(val, ...refs);
    };
}
