import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
    | 'default-text-color'
    | 'alternate-text-color'
    | 'visited-link-color'

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}

export const defaultAliasTokens: AliasTokenMap = {
    'default-text-color': 'color-black',
    'alternate-text-color': 'color-neutral-65',
    'visited-link-color': 'color-discovery-50',
};
