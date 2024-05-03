import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type SkipLinkTokens =
    | 'skip-link-background-color'
    | 'skip-link-text-color'

export type SkipLinkTokenValue = AliasTokens | RefTokens;

export type SkipLinkTokenMap = {
    [Token in SkipLinkTokens]: SkipLinkTokenValue;
};

export const defaultSkipLinkTokens: SkipLinkTokenMap = {
    'skip-link-background-color': 'color-white',
    'skip-link-text-color': 'color-informative-50',
};
