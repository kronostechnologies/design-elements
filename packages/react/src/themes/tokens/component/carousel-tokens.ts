import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CarouselTokens =
    | 'carousel-dot-selected-background-color'
    | 'carousel-dot-unselected-background-color'
    | 'carousel-dot-border-color';

export type CarouselTokenValue = AliasTokens | RefTokens;

export type CarouselTokenMap = {
    [Token in CarouselTokens]: CarouselTokenValue;
};

export const defaultCarouselTokens: CarouselTokenMap = {
    'carousel-dot-selected-background-color': 'color-background-indicator-selected',
    'carousel-dot-unselected-background-color': 'color-background-empty',
    'carousel-dot-border-color': 'transparent-100',
};
