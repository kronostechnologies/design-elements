import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type LegendTokens =
    | 'legend-item-bullet-color'
    | 'legend-item-description-text-color'
    | 'legend-text-color'
    | 'legend-disabled-text-color';

export type LegendTokenValue = AliasTokens | RefTokens;

export type LegendTokenMap = {
    [Token in LegendTokens]: LegendTokenValue;
};

export const defaultLegendTokens: LegendTokenMap = {
    'legend-item-bullet-color': 'color-background-brand-subtle',
    'legend-item-description-text-color': 'color-content-subtle',
    'legend-text-color': 'color-content',
    'legend-disabled-text-color': 'color-content-disabled',
};
