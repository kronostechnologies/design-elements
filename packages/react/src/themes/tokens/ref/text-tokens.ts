import type { RefTokenMap } from '../tokens';

export type TextToken =
    | 'font-family-sans'
    | 'font-family-brand'
    | 'font-size-100'
    | 'font-size-200'
    | 'font-size-275'
    | 'font-size-300'
    | 'font-size-350'
    | 'font-size-400'
    | 'font-size-500'
    | 'font-size-600'
    | 'font-size-700'
    | 'font-size-800'
    | 'font-size-900'
    | 'font-size-1000'
    | 'font-size-1100'
    | 'font-size-1200'
    | 'font-weight-regular'
    | 'font-weight-semibold'
    | 'font-weight-bold'
    | 'line-height-100'
    | 'line-height-200'
    | 'line-height-300'
    | 'line-height-400'
    | 'line-height-500'
    | 'line-height-600'
    | 'line-height-700'
    | 'line-height-800'
    | 'line-height-900'
    | 'line-height-1000'
    | 'line-height-1100'
    | 'line-height-1200'
    | 'letter-spacing-normal'
    | 'font-transform-none'
    | 'font-transform-uppercase';

export const defaultTextTokens: RefTokenMap<TextToken> = {
    'font-family-sans': '"Open Sans", sans-serif',
    'font-family-brand': '"Open Sans", sans-serif',
    'font-size-100': '0.25rem',
    'font-size-200': '0.5rem',
    'font-size-275': '0.6875rem',
    'font-size-300': '0.75rem',
    'font-size-350': '0.875rem',
    'font-size-400': '1rem',
    'font-size-500': '1.25rem',
    'font-size-600': '1.5rem',
    'font-size-700': '1.75rem',
    'font-size-800': '2rem',
    'font-size-900': '2.25rem',
    'font-size-1000': '2.5rem',
    'font-size-1100': '2.75rem',
    'font-size-1200': '3rem',
    'font-weight-regular': '400',
    'font-weight-semibold': '600',
    'font-weight-bold': '700',
    'line-height-100': '0.25rem',
    'line-height-200': '0.5rem',
    'line-height-300': '0.75rem',
    'line-height-400': '1rem',
    'line-height-500': '1.25rem',
    'line-height-600': '1.5rem',
    'line-height-700': '1.75rem',
    'line-height-800': '2rem',
    'line-height-900': '2.25rem',
    'line-height-1000': '2.5rem',
    'line-height-1100': '2.75rem',
    'line-height-1200': '3rem',
    'letter-spacing-normal': '0.2px',
    'font-transform-none': 'none',
    'font-transform-uppercase': 'uppercase',
};
