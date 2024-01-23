import { RefTokens } from './ref-tokens';

export type AliasTokens =
    | 'button-color-secondary'
    | 'interaction-color';

type NoSelfReference<T, U extends string> = T extends U ? never : T;

export type AliasTokenMap = {
    [Token in AliasTokens]: NoSelfReference<RefTokens | AliasTokens, Token>;
}
