import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ProgressCircularTokens =
    | 'progress-circular-color'
    | 'progress-circular-inverted-color'

export type ProgressCircularTokenValue = AliasTokens | RefTokens;

export type ProgressCircularTokenMap = {
    [Token in ProgressCircularTokens]: ProgressCircularTokenValue;
};

export const defaultProgressCircularTokens: ProgressCircularTokenMap = {
    'progress-circular-color': 'color-background-brand',
    'progress-circular-inverted-color': 'color-white',
};
