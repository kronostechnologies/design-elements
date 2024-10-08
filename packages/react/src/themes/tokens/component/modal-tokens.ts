import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ModalTokens =
    | 'modal-background-color'
    | 'modal-border-color'
    | 'modal-backdrop-background-color'
    | 'modal-dialog-alert-icon-color';

export type ModalTokenValue = AliasTokens | RefTokens;

export type ModalTokenMap = {
    [Token in ModalTokens]: ModalTokenValue;
};

export const defaultModalTokens: ModalTokenMap = {
    'modal-background-color': 'color-background-overlay',
    'modal-border-color': 'color-border-overlay',
    'modal-backdrop-background-color': 'color-backdrop-background',
    'modal-dialog-alert-icon-color': 'color-feedback-content-alert',
};
