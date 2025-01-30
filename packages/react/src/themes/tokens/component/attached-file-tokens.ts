import type { ComponentTokenMap } from '../tokens';

export type AttachedFileToken =
    | 'attached-file-background-color'
    | 'attached-file-border-color'
    | 'attached-file-icon-color'
    | 'attached-file-text-color'
    | 'attached-file-auxiliary-text-color'
    | 'attached-file-success-text-color'
    | 'attached-file-success-icon-color'
    | 'attached-file-error-text-color'
    | 'attached-file-error-icon-color'

export const defaultAttachedFileTokens: ComponentTokenMap<AttachedFileToken> = {
    'attached-file-background-color': 'color-background',
    'attached-file-border-color': 'color-border',
    'attached-file-icon-color': 'color-content-subtle',
    'attached-file-text-color': 'color-content',
    'attached-file-auxiliary-text-color': 'color-content-subtle',
    'attached-file-success-text-color': 'color-control-auxiliary-success',
    'attached-file-success-icon-color': 'color-control-auxiliary-success',
    'attached-file-error-text-color': 'color-control-auxiliary-error',
    'attached-file-error-icon-color': 'color-control-auxiliary-error',
};
