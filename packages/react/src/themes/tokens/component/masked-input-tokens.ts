import type { ComponentTokenMap } from '../tokens';

export type MaskedInputToken =
    | 'masked-input-background-color'
    | 'masked-input-mask-text-color';

export const defaultMaskedInputTokens: ComponentTokenMap<MaskedInputToken> = {
    'masked-input-background-color': 'transparent-100',
    'masked-input-mask-text-color': 'color-control-auxiliary',
};
