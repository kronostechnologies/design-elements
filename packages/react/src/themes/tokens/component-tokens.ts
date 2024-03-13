import { AliasTokens } from './alias-tokens';
import { BentoMenuButtonTokens, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CardLinkTokens, defaultCardLinkTokens } from './component/card-link-tokens';
import { defaultExternalLinkTokens, ExternalLinkTokens } from './component/external-link-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultNavListTokens, NavListTokens } from './component/nav-list-tokens';
import { defaultNavListItemTokens, NavListItemTokens } from './component/nav-list-item-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
import { defaultPasswordInputTokens, PasswordInputTokens } from './component/password-input-tokens';
import { defaultRouteLinkTokens, RouteLinkTokens } from './component/route-link-tokens';
import { defaultSkipLinkTokens, SkipLinkTokens } from './component/skip-link-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';
import { BadgeTokens, defaultBadgeTokens } from './component/badge-tokens';
import { defaultGlobalBannerTokens, GlobalBannerTokens } from './component/global-banner-tokens';
import { defaultSectionalBannerTokens, SectionalBannerTokens } from './component/sectional-banner-tokens';
import { defaultSpinnerTokens, SpinnerTokens } from './component/spinner-tokens';
import { defaultTagTokens, TagTokens } from './component/tag-tokens';
import { defaultToastContainerTokens, ToastContainerTokens } from './component/toast-container-tokens';

export type ComponentTokens =
    | BentoMenuButtonTokens
    | ButtonTokens
    | CardLinkTokens
    | ExternalLinkTokens
    | FocusTokens
    | HeadingTokens
    | LabelTokens
    | NavListTokens
    | NavListItemTokens
    | PaginationTokens
    | RouteLinkTokens
    | SkipLinkTokens
    | BadgeTokens
    | GlobalBannerTokens
    | SectionalBannerTokens
    | SpinnerTokens
    | TagTokens
    | ToastContainerTokens
    | PasswordInputTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultBentoMenuButtonTokens,
    ...defaultButtonTokens,
    ...defaultCardLinkTokens,
    ...defaultExternalLinkTokens,
    ...defaultFocusTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultNavListTokens,
    ...defaultNavListItemTokens,
    ...defaultPaginationTokens,
    ...defaultRouteLinkTokens,
    ...defaultSkipLinkTokens,
    ...defaultFocusTokens,
    ...defaultBadgeTokens,
    ...defaultGlobalBannerTokens,
    ...defaultSectionalBannerTokens,
    ...defaultSpinnerTokens,
    ...defaultTagTokens,
    ...defaultToastContainerTokens,
    ...defaultPasswordInputTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
