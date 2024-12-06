import type { ComponentTokenMap } from '../tokens';

export type CarouselToken =
    | 'carousel-dot-selected-background-color'
    | 'carousel-dot-unselected-background-color'
    | 'carousel-dot-border-color';

export const defaultCarouselTokens: ComponentTokenMap<CarouselToken> = {
    'carousel-dot-selected-background-color': 'color-background-indicator-selected',
    'carousel-dot-unselected-background-color': 'color-background-empty',
    'carousel-dot-border-color': 'transparent-100',
};
