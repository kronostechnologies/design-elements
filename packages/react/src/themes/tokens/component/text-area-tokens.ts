import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TextAreaTokens =
    | 'text-area-counter-text-color'
    | 'text-area-counter-error-text-color';

export type TextAreaTokenValue = AliasTokens | RefTokens;

export type TextAreaTokenMap = {
    [Token in TextAreaTokens]: TextAreaTokenValue;
};

export const defaultTextAreaTokens: TextAreaTokenMap = {
    'text-area-counter-error-text-color': 'color-input-content-error',
    'text-area-counter-text-color': 'color-input-content',
};
