import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TooltipTokens =
    | 'tooltip-border-color'
    | 'tooltip-text-color'
    | 'tooltip-success-background-color'
    | 'tooltip-default-background-color';

export type TooltipTokenValue = AliasTokens | RefTokens;

export type TooltipTokenMap = {
    [Token in TooltipTokens]: TooltipTokenValue;
};

export const defaultTooltipTokens: TooltipTokenMap = {
    'tooltip-border-color': 'color-white',
    'tooltip-text-color': 'color-white',
    'tooltip-success-background-color': 'color-success-50',
    'tooltip-default-background-color': 'color-neutral-65',
};
