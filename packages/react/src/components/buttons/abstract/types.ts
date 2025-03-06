import { ButtonHTMLAttributes } from 'react';

export type Size = 'small' | 'medium';

export interface AbstractButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    focusable?: boolean;
    isMobile: boolean;
    size?: Size;
    tabIndex?: number;
}
