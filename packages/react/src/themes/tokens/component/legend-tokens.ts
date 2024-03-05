import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LegendTokens =
    | 'legend-item-bullet-background-color'
    | 'legend-item-description-text-color'

export type LegendTokenValue = AliasTokens | RefTokens;

export type LegendTokenMap = {
    [Token in LegendTokens]: LegendTokenValue;
};

export const defaultLegendTokens: LegendTokenMap = {
    'legend-item-bullet-background-color': 'color-brand-20',
    'legend-item-description-text-color': 'color-neutral-65',
};
