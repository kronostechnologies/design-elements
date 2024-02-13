import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type BentoMenuButtonTokens =
    | 'bento-menu-divider-border-color'

export type BentoMenuButtonTokenValue = AliasTokens | RefTokens;

export type BentoMenuButtonTokenMap = {
    [Token in BentoMenuButtonTokens]: BentoMenuButtonTokenValue;
};

export const defaultBentoMenuButtonTokens: BentoMenuButtonTokenMap = {
    'bento-menu-divider-border-color': 'color-neutral-15',
};
