import type { ComponentTokenMap } from '../tokens';

export type HeadingToken =
    | 'heading-text-color'
    | 'heading-subtitle-text-color';

export const defaultHeadingTokens: ComponentTokenMap<HeadingToken> = {
    'heading-text-color': 'color-content',
    'heading-subtitle-text-color': 'color-content-subtle',
};
