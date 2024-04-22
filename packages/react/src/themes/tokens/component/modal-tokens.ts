import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ModalTokens =
    | 'modal-background-color'
    | 'modal-border-color'
    | 'modal-blanket-background-color'
    | 'modal-focus-border-color'
    | 'modal-focus-box-shadow-color';

export type ModalTokenValue = AliasTokens | RefTokens;

export type ModalTokenMap = {
    [Token in ModalTokens]: ModalTokenValue;
};

export const defaultModalTokens: ModalTokenMap = {
    'modal-background-color': 'color-white',
    'modal-border-color': 'color-neutral-50',
    'modal-blanket-background-color': 'transparent-dark-75',

    'modal-focus-border-color': 'color-brand-50',
    'modal-focus-box-shadow-color': 'color-brand-20',
};
