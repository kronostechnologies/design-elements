import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type BentoMenuButtonTokens =
    | 'bento-menu-divider-color'

export type BentoMenuButtonTokenValue = AliasTokens | RefTokens;

export type BentoMenuButtonTokenMap = {
    [Token in BentoMenuButtonTokens]: BentoMenuButtonTokenValue;
};

export const defaultBentoMenuButtonTokens: BentoMenuButtonTokenMap = {
    'bento-menu-divider-color': 'separator-color',
};
