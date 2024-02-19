import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TextAreaTokens =
    | 'text-area-counter-text-color'
    | 'text-area-counter-invalid-text-color';

export type TextAreaTokenValue = AliasTokens | RefTokens;

export type TextAreaTokenMap = {
    [Token in TextAreaTokens]: TextAreaTokenValue;
};

export const defaultTextAreaTokens: TextAreaTokenMap = {
    'text-area-counter-invalid-text-color': 'color-alert-50',
    'text-area-counter-text-color': 'color-neutral-65',
};
