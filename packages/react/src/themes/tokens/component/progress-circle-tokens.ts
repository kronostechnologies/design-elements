import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressCircleTokens =
    | 'progress-circle-empty-stroke-color'
    | 'progress-circle-label-text-color'
    | 'progress-circle-result-text-color'

export type ProgressCircleTokenValue = AliasTokens | RefTokens;

export type ProgressCircleTokenMap = {
    [Token in ProgressCircleTokens]: ProgressCircleTokenValue;
};

export const defaultProgressCircleTokens: ProgressCircleTokenMap = {
    'progress-circle-empty-stroke-color': 'color-neutral-15',
    'progress-circle-label-text-color': 'color-black',
    'progress-circle-result-text-color': 'color-black',
};
