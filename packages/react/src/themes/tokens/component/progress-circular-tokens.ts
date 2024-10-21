import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressCircularTokens =
    | 'progress-circular-fill-color'
    | 'progress-circular-inverted-fill-color'

export type ProgressCircularTokenValue = AliasTokens | RefTokens;

export type ProgressCircularTokenMap = {
    [Token in ProgressCircularTokens]: ProgressCircularTokenValue;
};

export const defaultProgressCircularTokens: ProgressCircularTokenMap = {
    'progress-circular-fill-color': 'color-content-brand',
    'progress-circular-inverted-fill-color': 'color-content-inverse',
};
