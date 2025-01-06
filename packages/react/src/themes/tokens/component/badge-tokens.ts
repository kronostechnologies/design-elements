import type { ComponentTokenMap } from '../tokens';

export type BadgeToken =
    | 'badge-background-color'
    | 'badge-text-color';

export const defaultBadgeTokens: ComponentTokenMap<BadgeToken> = {
    'badge-background-color': 'color-feedback-background-alert-bold',
    'badge-text-color': 'color-content-inverse',
};
