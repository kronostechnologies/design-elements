import type { ComponentTokenMap } from '../tokens';

export type CardToken =
    | 'card-background-color'
    | 'card-border-color'
    | 'card-link-border-color'
    | 'card-text-color'
    | 'card-box-shadow-color'
    | 'card-link-hover-background-color'
    | 'card-link-hover-border-color';

export const defaultCardTokens : ComponentTokenMap<CardToken> = {
    'card-background-color': 'color-background',
    'card-border-color': 'color-border-subtle',
    'card-text-color': 'color-content',
    'card-link-border-color': 'color-border-bold',
    'card-link-hover-border-color': 'color-border-hover',
    'card-link-hover-background-color': 'color-background-hover',
    'card-box-shadow-color': 'color-box-shadow',
};
