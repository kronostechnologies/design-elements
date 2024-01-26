import { NoSelfReference } from '../../utility-types';
import { RefTokens } from './ref-tokens';

export type AliasTokens =
    | 'focus-border-color'
    | 'focus-box-shadow-color'
    | 'focus-box-shadow-inset-color'
    | 'focus-border-box-shadow-color-1'
    | 'focus-border-box-shadow-color-2'
    | 'focus-border-box-shadow-inset-color-1'
    | 'focus-border-box-shadow-inset-color-2';

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}
