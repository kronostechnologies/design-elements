import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LabelItemTokens =
    | 'label-item-color';

export type LabelItemTokenValue = AliasTokens | RefTokens;

export type LabelItemTokenMap = {
    [Token in LabelItemTokens]: LabelItemTokenValue;
};

export const defaultLabelItemTokens: LabelItemTokenMap = {
    'label-item-color': 'color-black',
};
