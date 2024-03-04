import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type CarouselTokens =
    | 'carousel-control-active-background-color'
    | 'carousel-control-inactive-background-color'
    | 'carousel-arrow-icon-color';

export type CarouselTokenValue = AliasTokens | RefTokens;

export type CarouselTokenMap = {
    [Token in CarouselTokens]: CarouselTokenValue;
};

export const defaultCarouselTokens: CarouselTokenMap = {
    'carousel-control-active-background-color': 'color-brand-50',
    'carousel-control-inactive-background-color': 'color-neutral-15',
    'carousel-arrow-icon-color': 'color-neutral-65',
};
