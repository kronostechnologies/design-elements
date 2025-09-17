import { useContext } from 'react';
import { ToastContext, type ToastContextProps } from '../components/toast/toast-context';

export function useToasts(): ToastContextProps {
    return useContext(ToastContext);
}
