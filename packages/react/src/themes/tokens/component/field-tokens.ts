import type { ComponentTokenMap } from '../tokens';

export type FieldToken =
    | 'field-error-text-color'
    | 'field-hint-text-color'
    | 'field-input-border-color'
    | 'field-input-error-border-color';

export const defaultFieldTokens: ComponentTokenMap<FieldToken> = {
    'field-hint-text-color': 'color-control-auxiliary',
    'field-error-text-color': 'color-control-auxiliary-error',
    'field-input-border-color': 'color-control-border',
    'field-input-error-border-color': 'color-control-border-error',
};
