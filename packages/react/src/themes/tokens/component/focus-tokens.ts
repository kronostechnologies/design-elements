import type { ComponentTokenMap } from '../tokens';

export type FocusToken =
    | 'focus-inside-border-color'
    | 'focus-inverted-inside-border-color'
    | 'focus-outside-border-color'
    | 'focus-inverted-outside-border-color';

export const defaultFocusTokens: ComponentTokenMap<FocusToken> = {
    'focus-inside-border-color': 'color-border-focus-inside',
    'focus-outside-border-color': 'color-border-focus-outside',
    'focus-inverted-inside-border-color': 'color-border-focus-inside-inverse',
    'focus-inverted-outside-border-color': 'color-border-focus-outside-inverse',
};
