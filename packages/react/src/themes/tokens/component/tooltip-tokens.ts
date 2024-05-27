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
    'tooltip-icon-color': 'color-content',
    'tooltip-inverted-icon-color': 'color-content-inverse',
    'tooltip-popper-container-border-color': 'color-border-inverse',
    'tooltip-popper-container-text-color': 'color-content-inverse',
    'tooltip-popper-container-default-background-color': 'color-background-neutral-bold',
    'tooltip-popper-container-success-background-color': 'color-feedback-background-success-bold',
};
