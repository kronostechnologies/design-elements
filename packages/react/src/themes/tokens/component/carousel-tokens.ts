import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CarouselTokens =
    | 'carousel-dot-selected-background-color'
    | 'carousel-dot-unselected-background-color'
    | 'carousel-dot-border-color'
    | 'carousel-nav-button-border-color'
    | 'carousel-arrow-icon-color';

export type CarouselTokenValue = AliasTokens | RefTokens;

export type CarouselTokenMap = {
    [Token in CarouselTokens]: CarouselTokenValue;
};

export const defaultCarouselTokens: CarouselTokenMap = {
    'carousel-dot-selected-background-color': 'color-bg-indicator-selected',
    'carousel-dot-unselected-background-color': 'color-bg-empty',
    'carousel-arrow-icon-color': 'color-content-subtle',
    'carousel-dot-border-color': 'transparent-100',
    'carousel-nav-button-border-color': 'transparent-100',
};
