import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LabelTokens =
    | 'label-text-color'
    | 'label-disabled-text-color';

export type LabelTokenValue = AliasTokens | RefTokens;

export type LabelTokenMap = {
    [Token in LabelTokens]: LabelTokenValue;
};

export const defaultLabelTokens: LabelTokenMap = {
    'label-text-color': 'color-content',
    'label-disabled-text-color': 'color-content-disabled',
};
