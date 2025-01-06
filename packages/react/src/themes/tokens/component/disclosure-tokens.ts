import type { ComponentTokenMap } from '../tokens';

export type DisclosureToken =
    | 'disclosure-background-color'
    | 'disclosure-border-color'
    | 'disclosure-box-shadow-color'
    | 'disclosure-text-color';

export const defaultDisclosureTokens: ComponentTokenMap<DisclosureToken> = {
    'disclosure-background-color': 'color-menu-background',
    'disclosure-border-color': 'color-menu-border',
    'disclosure-box-shadow-color': 'color-box-shadow',
    'disclosure-text-color': 'color-menu-item-content',
};
