import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type TooltipTokens =
    | 'tooltip-icon-color'
    | 'tooltip-inverted-icon-color'
    | 'tooltip-popper-container-border-color'
    | 'tooltip-popper-container-text-color'
    | 'tooltip-popper-container-success-background-color'
    | 'tooltip-popper-container-default-background-color'

export type TooltipTokenValue = AliasTokens | RefTokens;

export type TooltipTokenMap = {
    [Token in TooltipTokens]: TooltipTokenValue;
};

export const defaultTooltipTokens: TooltipTokenMap = {
    'tooltip-icon-color': 'color-neutral-90',
    'tooltip-inverted-icon-color': 'color-white',
    'tooltip-popper-container-border-color': 'color-white',
    'tooltip-popper-container-text-color': 'color-white',
    'tooltip-popper-container-success-background-color': 'color-success-50',
    'tooltip-popper-container-default-background-color': 'color-neutral-65',
};
