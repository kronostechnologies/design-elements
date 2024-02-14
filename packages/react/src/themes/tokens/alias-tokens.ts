import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
    | 'alternate-text-color'
    | 'default-text-color'
    | 'separator-color'
    | 'visited-link-color'

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}

export const defaultAliasTokens: AliasTokenMap = {
    'alternate-text-color': 'color-neutral-65',
    'default-text-color': 'color-black',
    'separator-color': 'color-neutral-15',
    'visited-link-color': 'color-discovery-50',
};
