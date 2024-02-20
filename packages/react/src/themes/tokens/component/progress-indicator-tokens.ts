import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressIndicatorTokens =
    | 'progress-indicator-background-color'
    | 'progress-indicator-label-text-color'

export type ProgressIndicatorTokenValue = AliasTokens | RefTokens;

export type ProgressIndicatorTokenMap = {
    [Token in ProgressIndicatorTokens]: ProgressIndicatorTokenValue;
};

export const defaultProgressIndicatorTokens: ProgressIndicatorTokenMap = {
    'progress-indicator-background-color': 'color-neutral-15',
    'progress-indicator-label-text-color': 'color-black',
};
