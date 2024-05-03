import { Context, createContext, Dispatch, SetStateAction } from 'react';

export type UpdateState<S> = Dispatch<SetStateAction<S>>;
export type UseStateResponse<S> = readonly [S, UpdateState<S>];
export type HookContext<S> = Context<UseStateResponse<S>>;

const noop = (): void => undefined;

export function createStatefulContext<S>(defaultValue: S, updateValue: UpdateState<S> = noop): HookContext<S> {
    return createContext<UseStateResponse<S>>([defaultValue, updateValue]);
}
