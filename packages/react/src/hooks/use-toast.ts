import { useCallback } from 'react';
import { ToastType } from '../components/toast/toast-type';
import { useToasts } from './use-toasts';

export interface UseToastResponse {
    showToast(type: ToastType, message: string): string;

    hideToast(id: string): void;
}

export function useToast(): UseToastResponse {
    const { addToast, removeToast } = useToasts();

    const showToast: UseToastResponse['showToast'] = useCallback(
        (type, message) => addToast(type, message, true),
        [addToast],
    );

    return { showToast, hideToast: removeToast };
}
