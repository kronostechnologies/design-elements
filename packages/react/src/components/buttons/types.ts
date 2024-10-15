import { FocusEventHandler, MouseEvent, KeyboardEvent } from 'react';
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
    title?: string;
    type?: Type;

    leftIconName?: IconName;
    rightIconName?: IconName;

    onClick?(event: MouseEvent<HTMLButtonElement>): void;
    onFocus?: FocusEventHandler<HTMLButtonElement>;
    onBlur?: FocusEventHandler<HTMLButtonElement>;
    onKeyDown?(event: KeyboardEvent<HTMLButtonElement>): void;
}
