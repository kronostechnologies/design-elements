import { useContext } from 'react';
import { ToastContext, ToastContextProps } from '../components/toast/toast-context';

export function useToasts(): ToastContextProps {
    return useContext(ToastContext);
}
