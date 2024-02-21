import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TooltipTokens =
    | 'tooltip-border-color'
    | 'tooltip-container-color'
    | 'tooltip-success-color'
    | 'tooltip-default-color'

export type TooltipTokenValue = AliasTokens | RefTokens;

export type TooltipTokenMap = {
    [Token in TooltipTokens]: TooltipTokenValue;
};

export const defaultTooltipTokens: TooltipTokenMap = {
    'tooltip-border-color': 'color-white',
    'tooltip-container-color': 'color-white',
    'tooltip-success-color': 'color-success-50',
    'tooltip-default-color': 'color-neutral-65',
};
