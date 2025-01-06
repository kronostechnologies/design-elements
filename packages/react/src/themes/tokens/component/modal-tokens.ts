import type { ComponentTokenMap } from '../tokens';

export type ModalToken =
    | 'modal-background-color'
    | 'modal-border-color'
    | 'modal-backdrop-background-color'
    | 'modal-dialog-alert-icon-color';

export const defaultModalTokens: ComponentTokenMap<ModalToken> = {
    'modal-background-color': 'color-background-overlay',
    'modal-border-color': 'color-border-overlay',
    'modal-backdrop-background-color': 'color-backdrop-background',
    'modal-dialog-alert-icon-color': 'color-feedback-content-alert',
};
