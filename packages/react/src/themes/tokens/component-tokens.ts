import { AliasTokens } from './alias-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CardLinkTokens, defaultCardLinkTokens } from './component/card-link-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type ComponentTokens =
    | ButtonTokens
    | CardLinkTokens
    | FocusTokens
    | HeadingTokens
    | LabelTokens
    | PaginationTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultButtonTokens,
    ...defaultCardLinkTokens,
    ...defaultFocusTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultPaginationTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
