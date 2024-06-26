import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type HeadingTokens =
    | 'heading-text-color'
    | 'heading-subtitle-text-color';

export type HeadingTokenValue = AliasTokens | RefTokens;

export type HeadingTokenMap = {
    [Token in HeadingTokens]: HeadingTokenValue;
};

export const defaultHeadingTokens: HeadingTokenMap = {
    'heading-text-color': 'color-content',
    'heading-subtitle-text-color': 'color-content-subtle',
};
