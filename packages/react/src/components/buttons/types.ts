import { FocusEventHandler, MouseEventHandler, KeyboardEventHandler } from 'react';
import { IconName } from '../icon/icon';
import { Size } from './abstract/types';

export type Type = 'submit' | 'button' | 'reset';

export type ButtonType =
    | 'primary'
    | 'secondary'
    | 'tertiary'
    | 'destructive-primary'
    | 'destructive-secondary'
    | 'destructive-tertiary';

export interface ButtonProps {
    id?: string;
    autofocus?: boolean;
    /**
     * Visual style
     * @default primary
     */
    buttonType: ButtonType;
    className?: string;
    disabled?: boolean;
    /**
     * @default true
     */
    focusable?: boolean;
    inverted?: boolean;
    label?: string;
    loading?: boolean;
    /**
     * @default Loading...
     */
    loadingLabel?: string;
    /**
     * Size variant
     * @default medium
     */
    size?: Size;
    tabIndex?: number;
    title?: string;
    type?: Type;

    leftIconName?: IconName;
    rightIconName?: IconName;

    onClick?: MouseEventHandler<HTMLButtonElement>;
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    onKeyDown?: KeyboardEventHandler<HTMLButtonElement>;
}
