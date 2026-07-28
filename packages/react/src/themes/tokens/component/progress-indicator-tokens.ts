import type { ComponentTokenMap } from '../tokens';

export type ProgressIndicatorToken =
    | 'progress-indicator-fill-color';

export const defaultProgressIndicatorTokens: ComponentTokenMap<ProgressIndicatorToken> = {
    'progress-indicator-fill-color': 'color-background-brand',
};
