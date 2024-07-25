import { ButtonHTMLAttributes } from 'react';
import { Size } from '../types';

export interface AbstractButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    focusable?: boolean;
    isMobile: boolean;
    size?: Size;
}
