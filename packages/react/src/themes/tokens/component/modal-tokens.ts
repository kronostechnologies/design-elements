import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ModalTokens =
    | 'modal-background-color'
    | 'modal-blanket-background-color'
    | 'modal-overlay-border-color'
    | 'modal-focus-border-color'
    | 'modal-focus-box-shadow-color';

export type ModalTokenValue = AliasTokens | RefTokens;

export type ModalTokenMap = {
    [Token in ModalTokens]: ModalTokenValue;
};

export const defaultModalTokens: ModalTokenMap = {
    'modal-background-color': 'color-bg-overlay',
    'modal-overlay-border-color': 'color-border-overlay',
    'modal-blanket-background-color': 'color-blanket-bg',

    'modal-focus-border-color': 'color-brand-50',
    'modal-focus-box-shadow-color': 'color-brand-20',
};
