import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SpinnerTokens =
    | 'spinner-fill';

export type SpinnerTokenValue = AliasTokens | RefTokens;

export type SpinnerTokenMap = {
    [Token in SpinnerTokens]: SpinnerTokenValue;
};

export const defaultSpinnerTokens: SpinnerTokenMap = {
    'spinner-fill': 'color-brand-50',
};