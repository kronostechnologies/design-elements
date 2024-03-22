import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ModalTokens =
    | 'modal-background-color'
    | 'modal-focus-border-color'
    | 'modal-focus-box-shadow-color'
    | 'modal-overlay-border-color';

export type ModalTokenValue = AliasTokens | RefTokens;

export type ModalTokenMap = {
    [Token in ModalTokens]: ModalTokenValue;
};

export const defaultModalTokens: ModalTokenMap = {
    'modal-background-color': 'color-bg-surface',
    'modal-overlay-border-color': 'color-overlay-border',
    'modal-focus-border-color': 'color-brand-50',
    'modal-focus-box-shadow-color': 'color-brand-20',
};
