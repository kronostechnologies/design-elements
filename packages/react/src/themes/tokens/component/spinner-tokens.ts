import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SpinnerTokens =
    | 'spinner-fill-color';

export type SpinnerTokenValue = AliasTokens | RefTokens;

export type SpinnerTokenMap = {
    [Token in SpinnerTokens]: SpinnerTokenValue;
};

export const defaultSpinnerTokens: SpinnerTokenMap = {
    'spinner-fill-color': 'color-bg-indicator',
};
