import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CarouselTokens =
    | 'carousel-dot-active-background-color'
    | 'carousel-dot-inactive-background-color'
    | 'carousel-arrow-icon-color';

export type CarouselTokenValue = AliasTokens | RefTokens;

export type CarouselTokenMap = {
    [Token in CarouselTokens]: CarouselTokenValue;
};

export const defaultCarouselTokens: CarouselTokenMap = {
    'carousel-dot-active-background-color': 'color-brand-50',
    'carousel-dot-inactive-background-color': 'color-neutral-15',
    'carousel-arrow-icon-color': 'color-neutral-65',
};
