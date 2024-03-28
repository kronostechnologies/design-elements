import { AliasTokens } from './alias-tokens';
import { AvatarTokens, defaultAvatarTokens } from './component/avatar-tokens';
import { BentoMenuButtonTokens, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CardLinkTokens, defaultCardLinkTokens } from './component/card-link-tokens';
import { CardTokens, defaultCardTokens } from './component/card-tokens';
import { defaultDropdownMenuTokens, DropdownMenuTokens } from './component/dropdown-menu-tokens';
import { defaultExternalLinkTokens, ExternalLinkTokens } from './component/external-link-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultGlobalHeaderTokens, GlobalHeaderTokens } from './component/global-header-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultLegendTokens, LegendTokens } from './component/legend-tokens';
import { defaultLozengeTokens, LozengeTokens } from './component/lozenge-tokens';
import { defaultNavListTokens, NavListTokens } from './component/nav-list-tokens';
import { defaultNavListItemTokens, NavListItemTokens } from './component/nav-list-item-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
import { defaultProgressCircleTokens, ProgressCircleTokens } from './component/progress-circle-tokens';
import { defaultProgressIndicatorTokens, ProgressIndicatorTokens } from './component/progress-indicator-tokens';
import { defaultProgressTrackerTokens, ProgressTrackerTokens } from './component/progress-tracker-tokens';
import { defaultRouteLinkTokens, RouteLinkTokens } from './component/route-link-tokens';
import { defaultSideDrawerTokens, SideDrawerTokens } from './component/side-drawer-tokens';
import { defaultSkipLinkTokens, SkipLinkTokens } from './component/skip-link-tokens';
import { defaultSortButtonTokens, SortButtonIconTokens } from './component/sort-button-icon-tokens';
import { defaultTableTokens, TableTokens } from './component/table-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';
import { BadgeTokens, defaultBadgeTokens } from './component/badge-tokens';
import { defaultGlobalBannerTokens, GlobalBannerTokens } from './component/global-banner-tokens';
import { defaultSectionalBannerTokens, SectionalBannerTokens } from './component/sectional-banner-tokens';
import { defaultSpinnerTokens, SpinnerTokens } from './component/spinner-tokens';
import { defaultStatusTokens, StatusTokens } from './component/status-tokens';
import { defaultTagTokens, TagTokens } from './component/tag-tokens';
import { defaultToastContainerTokens, ToastContainerTokens } from './component/toast-container-tokens';
import { AccordionTokens, defaultAccordionTokens } from './component/accordion-tokens';
import { CarouselTokens, defaultCarouselTokens } from './component/carousel-tokens';
import { defaultModalTokens, ModalTokens } from './component/modal-tokens';
import { defaultTooltipTokens, TooltipTokens } from './component/tooltip-tokens';
import { defaultToggleTipTokens, ToggleTipTokens } from './component/toggletip-tokens';
import { defaultTabTokens, TabTokens } from './component/tab-tokens';

export type ComponentTokens =
    | AvatarTokens
    | BentoMenuButtonTokens
    | ButtonTokens
    | CardLinkTokens
    | ExternalLinkTokens
    | FocusTokens
    | HeadingTokens
    | LabelTokens
    | LegendTokens
    | NavListTokens
    | NavListItemTokens
    | PaginationTokens
    | ProgressCircleTokens
    | ProgressIndicatorTokens
    | ProgressTrackerTokens
    | RouteLinkTokens
    | SkipLinkTokens
    | BadgeTokens
    | GlobalBannerTokens
    | SectionalBannerTokens
    | SpinnerTokens
    | StatusTokens
    | TagTokens
    | ToastContainerTokens
    | AccordionTokens
    | CarouselTokens
    | ModalTokens
    | TooltipTokens
    | ToggleTipTokens
    | SideDrawerTokens
    | GlobalHeaderTokens
    | CardTokens
    | SortButtonIconTokens
    | TableTokens
    | DropdownMenuTokens
    | TabTokens
    | LozengeTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultAvatarTokens,
    ...defaultBentoMenuButtonTokens,
    ...defaultButtonTokens,
    ...defaultCardLinkTokens,
    ...defaultExternalLinkTokens,
    ...defaultFocusTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultLegendTokens,
    ...defaultNavListTokens,
    ...defaultNavListItemTokens,
    ...defaultPaginationTokens,
    ...defaultProgressCircleTokens,
    ...defaultProgressIndicatorTokens,
    ...defaultProgressTrackerTokens,
    ...defaultRouteLinkTokens,
    ...defaultSkipLinkTokens,
    ...defaultFocusTokens,
    ...defaultBadgeTokens,
    ...defaultGlobalBannerTokens,
    ...defaultSectionalBannerTokens,
    ...defaultSpinnerTokens,
    ...defaultStatusTokens,
    ...defaultTagTokens,
    ...defaultToastContainerTokens,
    ...defaultAccordionTokens,
    ...defaultCarouselTokens,
    ...defaultModalTokens,
    ...defaultTooltipTokens,
    ...defaultToggleTipTokens,
    ...defaultTabTokens,
    ...defaultSideDrawerTokens,
    ...defaultGlobalHeaderTokens,
    ...defaultCardTokens,
    ...defaultSortButtonTokens,
    ...defaultTableTokens,
    ...defaultDropdownMenuTokens,
    ...defaultLozengeTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
