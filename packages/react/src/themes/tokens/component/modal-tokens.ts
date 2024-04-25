import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ModalTokens =
    | 'modal-background-color'
    | 'modal-border-color'
    | 'modal-header-border-bottom-color'
    | 'modal-footer-border-top-color';

export type ModalTokenValue = AliasTokens | RefTokens;

export type ModalTokenMap = {
    [Token in ModalTokens]: ModalTokenValue;
};

export const defaultModalTokens: ModalTokenMap = {
    'modal-background-color': 'color-white',
    'modal-border-color': 'color-neutral-65',
    'modal-header-border-bottom-color': 'color-neutral-50',
    'modal-footer-border-top-color': 'color-neutral-50',
};
