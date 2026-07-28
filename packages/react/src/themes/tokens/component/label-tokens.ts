import type { ComponentTokenMap } from '../tokens';

export type LabelToken =
    | 'label-text-color'
    | 'label-required-mark-color';

export const defaultLabelTokens: ComponentTokenMap<LabelToken> = {
    'label-text-color': 'color-content',
    'label-required-mark-color': 'color-control-important',
};
