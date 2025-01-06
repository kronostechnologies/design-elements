import type { ComponentTokenMap } from '../tokens';

export type ProgressCircularToken =
    | 'progress-circular-color'
    | 'progress-circular-inverted-color'

export const defaultProgressCircularTokens: ComponentTokenMap<ProgressCircularToken> = {
    'progress-circular-color': 'color-background-brand',
    'progress-circular-inverted-color': 'color-white',
};
