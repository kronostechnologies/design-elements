import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
    | 'default-text-color'
    | 'alternate-text-color';

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}
