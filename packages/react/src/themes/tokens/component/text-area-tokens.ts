import type { ComponentTokenMap } from '../tokens';

export type TextAreaToken =
    | 'text-area-counter-text-color'
    | 'text-area-counter-error-text-color';

export const defaultTextAreaTokens: ComponentTokenMap<TextAreaToken> = {
    'text-area-counter-error-text-color': 'color-control-auxiliary-error',
    'text-area-counter-text-color': 'color-control-auxiliary',
};
