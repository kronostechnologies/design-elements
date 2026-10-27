import type { RefTokenMap } from '../tokens';

/** Spacing values aligned with `--spacing-*` in `_variables.scss` (8px base). */
export type SpacingToken =
    | 'spacing-1x'
    | 'spacing-1halfx';

export const defaultSpacingTokens: RefTokenMap<SpacingToken> = {
    'spacing-1x': '0.5rem',
    'spacing-1halfx': '0.75rem',
};
