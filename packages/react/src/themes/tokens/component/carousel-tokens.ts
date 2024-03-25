import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CarouselTokens =
    | 'carousel-dot-active-background-color'
    | 'carousel-dot-inactive-background-color'
    | 'carousel-dot-border-color'
    | 'carousel-nav-button-border-color'
    | 'carousel-arrow-icon-color';

export type CarouselTokenValue = AliasTokens | RefTokens;

export type CarouselTokenMap = {
    [Token in CarouselTokens]: CarouselTokenValue;
};

export const defaultCarouselTokens: CarouselTokenMap = {
    'carousel-dot-active-background-color': 'color-indicator-bg',
    'carousel-dot-inactive-background-color': 'color-empty-bg',
    'carousel-arrow-icon-color': 'color-icon-alternate',
    'carousel-dot-border-color': 'transparent-100',
    'carousel-nav-button-border-color': 'transparent-100',
};
