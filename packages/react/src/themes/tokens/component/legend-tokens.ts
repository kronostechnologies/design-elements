import type { ComponentTokenMap } from '../tokens';

export type LegendToken =
    | 'legend-text-color'
    | 'legend-disabled-text-color';

export const defaultLegendTokens: ComponentTokenMap<LegendToken> = {
    'legend-text-color': 'color-content',
    'legend-disabled-text-color': 'color-content-disabled',
};
