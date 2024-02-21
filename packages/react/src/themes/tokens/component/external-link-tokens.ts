import { AliasTokens } from '../alias-tokens';
import { RefTokens } from '../ref-tokens';

export type ExternalLinkTokens =
    | 'external-link-visited-text-color'

export type ExternalLinkTokenValue = AliasTokens | RefTokens;

export type ExternalLinkTokenMap = {
    [Token in ExternalLinkTokens]: ExternalLinkTokenValue;
};

export const defaultExternalLinkTokens: ExternalLinkTokenMap = {
    'external-link-visited-text-color': 'visited-link-color',
};
