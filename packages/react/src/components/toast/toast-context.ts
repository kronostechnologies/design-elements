import { createContext } from 'react';
import { ToastType } from './toast-type';

export interface Toast {
    id: string;
    type: ToastType;
    message: string;
    autoDelete?: boolean;
}

export interface ToastContextProps {
    toasts: Toast[];

    addToast(type: ToastType, message: string, autoDelete?: boolean): string;

    removeToast(id: string): void;
}

export const ToastContext = createContext<ToastContextProps>(undefined as unknown as ToastContextProps);
