import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LabelTokens =
    | 'label-text-color';

export type LabelTokenValue = AliasTokens | RefTokens;

export type LabelTokenMap = {
    [Token in LabelTokens]: LabelTokenValue;
};
