import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
    | 'button-color-secondary'
    | 'interaction-color';

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}
