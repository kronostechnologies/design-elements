import { FunctionComponent, PropsWithChildren, useCallback, useMemo } from 'react';
import { v4 as uuid } from '../../utils/uuid';
import { ToastContext } from './toast-context';
import type { ToastType } from './toast-type';
import { ToastsContainer } from './toasts-container';
import { useToastsReducer } from './toasts-reducer';

const dismissTimeInSeconds = 10;

export const ToastProvider: FunctionComponent<PropsWithChildren<{}>> = ({ children }) => {
    const [toasts, dispatch] = useToastsReducer();

    const removeToast = useCallback((id: string): void => {
        dispatch({
            type: 'remove',
            id,
        });
    }, [dispatch]);

    const addToast = useCallback((type: ToastType, message: string, autoDelete = true): string => {
        const id = uuid();
        dispatch({
            type: 'add',
            toast: {
                id,
                type,
                message,
                autoDelete,
            },
        });

        setTimeout(() => {
            removeToast(id);
        }, dismissTimeInSeconds * 1000);

        return id;
    }, [dispatch, removeToast]);

    const value = useMemo(() => ({ toasts, addToast, removeToast }), [addToast, removeToast, toasts]);

    return (
        <ToastContext.Provider value={value}>
            <ToastsContainer position="bottom-right" />
            {children}
        </ToastContext.Provider>
    );
};

ToastProvider.displayName = 'ToastProvider';
