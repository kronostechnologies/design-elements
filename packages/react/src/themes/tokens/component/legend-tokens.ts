import type { ComponentTokenMap } from '../tokens';

export type LegendToken =
    | 'legend-item-bullet-color'
    | 'legend-item-description-text-color'
    | 'legend-text-color'
    | 'legend-disabled-text-color';

export const defaultLegendTokens: ComponentTokenMap<LegendToken> = {
    'legend-item-bullet-color': 'color-background-brand-subtle',
    'legend-item-description-text-color': 'color-content-subtle',
    'legend-text-color': 'color-content',
    'legend-disabled-text-color': 'color-content-disabled',
};
