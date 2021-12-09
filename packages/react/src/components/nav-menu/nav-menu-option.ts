import { MouseEvent } from 'react';
import { IconName } from '../icon/icon';

export interface NavMenuOption {
    disabled?: boolean;
    endIcon?: IconName;
    exact?: boolean;
    href: string;
    isHtmlLink?: boolean;
    // Option label, if not provided will be set with value
    label?: string;
    startIcon?: IconName;
    target?: string;
    value: string;

    onClick?(event: MouseEvent<HTMLAnchorElement>): void;
}
