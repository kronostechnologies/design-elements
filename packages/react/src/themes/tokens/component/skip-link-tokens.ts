import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SkipLinkTokens =
    | 'skip-link-text-color'
    | 'skip-link-focus-background-color'

export type SkipLinkTokenValue = AliasTokens | RefTokens;

export type SkipLinkTokenMap = {
    [Token in SkipLinkTokens]: SkipLinkTokenValue;
};

export const defaultSkipLinkTokens: SkipLinkTokenMap = {
    'skip-link-text-color': 'color-informative-50',
    'skip-link-focus-background-color': 'color-white',
};
