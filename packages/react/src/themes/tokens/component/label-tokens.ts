import type { ComponentTokenMap } from '../tokens';

export type LabelToken =
    | 'label-text-color';

export const defaultLabelTokens: ComponentTokenMap<LabelToken> = {
    'label-text-color': 'color-content',
};
