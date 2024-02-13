import { AliasTokens } from './alias-tokens';
import { BentoMenuButtonTokens, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CardLinkTokens, defaultCardLinkTokens } from './component/card-link-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultNavListTokens, NavListTokens } from './component/nav-list-tokens';
import { defaultNavListItemTokens, NavListItemTokens } from './component/nav-list-item-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
import { defaultRouteLinkTokens, RouteLinkTokens } from './component/route-link-tokens';
import { defaultSkipLinkTokens, SkipLinkTokens } from './component/skip-link-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type ComponentTokens =
    | BentoMenuButtonTokens
    | ButtonTokens
    | CardLinkTokens
    | FocusTokens
    | HeadingTokens
    | LabelTokens
    | NavListTokens
    | NavListItemTokens
    | PaginationTokens
    | RouteLinkTokens
    | SkipLinkTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultBentoMenuButtonTokens,
    ...defaultButtonTokens,
    ...defaultCardLinkTokens,
    ...defaultFocusTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultNavListTokens,
    ...defaultNavListItemTokens,
    ...defaultPaginationTokens,
    ...defaultRouteLinkTokens,
    ...defaultSkipLinkTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
