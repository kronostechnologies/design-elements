import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressCircleTokens =
    | 'progress-circle-empty-track-color'
    | 'progress-circle-label-text-color'
    | 'progress-circle-result-text-color';

export type ProgressCircleTokenValue = AliasTokens | RefTokens;

export type ProgressCircleTokenMap = {
    [Token in ProgressCircleTokens]: ProgressCircleTokenValue;
};

export const defaultProgressCircleTokens: ProgressCircleTokenMap = {
    'progress-circle-empty-track-color': 'color-empty-bg-fill',
    'progress-circle-label-text-color': 'color-text',
    'progress-circle-result-text-color': 'color-text',
};
