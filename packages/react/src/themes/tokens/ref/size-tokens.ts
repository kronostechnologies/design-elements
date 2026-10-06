import type { RefTokenMap } from '../tokens';

/** Layout sizes aligned with `--size-*` in `_variables.scss` (1rem base). */
export type SizeToken =
    | 'size-1x'
    | 'size-2x'
    | 'size-3x'
    | 'size-125'
    | 'size-stepper-value-width-mobile';

export const defaultSizeTokens: RefTokenMap<SizeToken> = {
    'size-1x': '1rem',
    'size-2x': '2rem',
    'size-3x': '3rem',
    'size-125': '1.25rem',
    'size-stepper-value-width-mobile': '3.25rem',
};
