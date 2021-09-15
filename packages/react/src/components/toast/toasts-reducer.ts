import { Dispatch, ReducerAction, ReducerState, useReducer } from 'react';
import { Toast } from './toast-context';

export type ToastsState = Toast[]

interface AddToastAction {
    type: 'add';
    toast: Toast;
}

interface RemoveToastAction {
    type: 'remove';
    id: string;
}

type ToastsAction = AddToastAction | RemoveToastAction;

export function toastsReducer(state: ToastsState, action: ToastsAction): ToastsState {
    switch (action.type) {
        case 'add':
            return [
                ...state,
                action.toast,
            ];
        case 'remove':
            return state.filter((toast) => toast.id !== action.id);
        default:
            return state;
    }
}

type ToastsReducer = [ReducerState<typeof toastsReducer>, Dispatch<ReducerAction<typeof toastsReducer>>];

export function useToastsReducer(): ToastsReducer {
    return useReducer(toastsReducer, []);
}
