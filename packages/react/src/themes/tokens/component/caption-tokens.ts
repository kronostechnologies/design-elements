import type { ComponentTokenMap } from '../tokens';

export type CaptionToken =
    | 'caption-text-color';

export const defaultCaptionTokens: ComponentTokenMap<CaptionToken> = {
    'caption-text-color': 'color-content',
};
