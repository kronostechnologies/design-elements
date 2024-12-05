import type { ComponentTokenMap } from '../tokens';

export type SpinnerToken =
    | 'spinner-fill-color';

export const defaultSpinnerTokens: ComponentTokenMap<SpinnerToken> = {
    'spinner-fill-color': 'color-background-brand',
};
