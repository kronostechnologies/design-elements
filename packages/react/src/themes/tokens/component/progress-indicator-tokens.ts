import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressIndicatorTokens =
    | 'progress-indicator-empty-track-color'
    | 'progress-indicator-label-text-color';

export type ProgressIndicatorTokenValue = AliasTokens | RefTokens;

export type ProgressIndicatorTokenMap = {
    [Token in ProgressIndicatorTokens]: ProgressIndicatorTokenValue;
};

export const defaultProgressIndicatorTokens: ProgressIndicatorTokenMap = {
    'progress-indicator-empty-track-color': 'color-bg-empty',
    'progress-indicator-label-text-color': 'color-content',
};
