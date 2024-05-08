import { AliasTokens } from './alias-tokens';
import { AvatarTokens, defaultAvatarTokens } from './component/avatar-tokens';
import { BentoMenuButtonTokens, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CheckboxTokens, defaultCheckboxTokens } from './component/checkbox-tokens';
import { ChooserTokens, defaultChooserTokens } from './component/chooser-tokens';
import { ComboboxTokens, defaultComboboxTokens } from './component/combobox-tokens';
import { DatepickerTokens, defaultDatepickerTokens } from './component/datepicker-tokens';
import { defaultDropdownListTokens, DropdownListTokens } from './component/dropdown-list-tokens';
import { CardLinkTokens, defaultCardLinkTokens } from './component/card-link-tokens';
import { CardTokens, defaultCardTokens } from './component/card-tokens';
import { defaultDropdownMenuTokens, DropdownMenuTokens } from './component/dropdown-menu-tokens';
import { defaultExternalLinkTokens, ExternalLinkTokens } from './component/external-link-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultGlobalHeaderTokens, GlobalHeaderTokens } from './component/global-header-tokens';
import { defaultGlobalNavigationTokens, GlobalNavigationTokens } from './component/global-navigation';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultFieldTokens, FieldTokens } from './component/field-tokens';
import { defaultTextInputTokens, TextInputTokens } from './component/text-input-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultListboxTokens, ListboxTokens } from './component/listbox-tokens';
import { defaultMenuTokens, MenuTokens } from './component/menu-tokens';
import { defaultNumericInputTokens, NumericInputTokens } from './component/numeric-input-tokens';
import { defaultPasswordInputTokens, PasswordInputTokens } from './component/password-input-tokens';
import { defaultPhoneInputTokens, PhoneInputTokens } from './component/phone-input-tokens';
import { defaultRadioButtonGroupTokens, RadioButtonGroupTokens } from './component/radio-button-group-tokens';
import { defaultRadioCardTokens, RadioCardTokens } from './component/radio-card-tokens';
import { defaultSearchInputTokens, SearchInputTokens } from './component/search-input-tokens';
import { defaultStepperTokens, StepperTokens } from './component/stepper-tokens';
import { defaultTextAreaTokens, TextAreaTokens } from './component/text-area-tokens';
import { defaultToggleButtonGroupTokens, ToggleButtonGroupTokens } from './component/toggle-button-group-tokens';
import { defaultToggleSwitchTokens, ToggleSwitchTokens } from './component/toggle-switch-tokens';
import { defaultLegendTokens, LegendTokens } from './component/legend-tokens';
import { defaultLozengeTokens, LozengeTokens } from './component/lozenge-tokens';
import { defaultNavListTokens, NavListTokens } from './component/nav-list-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
import { defaultProgressCircleTokens, ProgressCircleTokens } from './component/progress-circle-tokens';
import { defaultProgressIndicatorTokens, ProgressIndicatorTokens } from './component/progress-indicator-tokens';
import { defaultProgressTrackerTokens, ProgressTrackerTokens } from './component/progress-tracker-tokens';
import { defaultRouteLinkTokens, RouteLinkTokens } from './component/route-link-tokens';
import { defaultSideDrawerTokens, SideDrawerTokens } from './component/side-drawer-tokens';
import { defaultSkipLinkTokens, SkipLinkTokens } from './component/skip-link-tokens';
import { defaultTableTokens, TableTokens } from './component/table-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';
import { BadgeTokens, defaultBadgeTokens } from './component/badge-tokens';
import { defaultGlobalBannerTokens, GlobalBannerTokens } from './component/global-banner-tokens';
import { defaultSectionalBannerTokens, SectionalBannerTokens } from './component/sectional-banner-tokens';
import { defaultSpinnerTokens, SpinnerTokens } from './component/spinner-tokens';
import { defaultStatusTokens, StatusTokens } from './component/status-tokens';
import { defaultTagTokens, TagTokens } from './component/tag-tokens';
import { defaultToastTokens, ToastTokens } from './component/toast-container-tokens';
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
    | CheckboxTokens
    | ChooserTokens
    | DatepickerTokens
    | DropdownListTokens
    | ListboxTokens
    | ComboboxTokens
    | MenuTokens
    | PasswordInputTokens
    | NumericInputTokens
    | PhoneInputTokens
    | SearchInputTokens
    | StepperTokens
    | TextAreaTokens
    | FieldTokens
    | RadioButtonGroupTokens
    | ToggleButtonGroupTokens
    | ToggleSwitchTokens
    | TextInputTokens
    | RadioCardTokens
    | LegendTokens
    | NavListTokens
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
    | ToastTokens
    | AccordionTokens
    | CarouselTokens
    | ModalTokens
    | TooltipTokens
    | ToggleTipTokens
    | SideDrawerTokens
    | GlobalHeaderTokens
    | CardTokens
    | TableTokens
    | DropdownMenuTokens
    | TabTokens
    | LozengeTokens
    | GlobalNavigationTokens;

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
    ...defaultPaginationTokens,
    ...defaultProgressCircleTokens,
    ...defaultProgressIndicatorTokens,
    ...defaultProgressTrackerTokens,
    ...defaultRouteLinkTokens,
    ...defaultSkipLinkTokens,
    ...defaultFocusTokens,
    ...defaultCheckboxTokens,
    ...defaultChooserTokens,
    ...defaultDatepickerTokens,
    ...defaultDropdownListTokens,
    ...defaultListboxTokens,
    ...defaultComboboxTokens,
    ...defaultMenuTokens,
    ...defaultPasswordInputTokens,
    ...defaultNumericInputTokens,
    ...defaultPhoneInputTokens,
    ...defaultSearchInputTokens,
    ...defaultStepperTokens,
    ...defaultTextAreaTokens,
    ...defaultFieldTokens,
    ...defaultRadioButtonGroupTokens,
    ...defaultToggleButtonGroupTokens,
    ...defaultToggleSwitchTokens,
    ...defaultTextInputTokens,
    ...defaultRadioCardTokens,
    ...defaultBadgeTokens,
    ...defaultGlobalBannerTokens,
    ...defaultSectionalBannerTokens,
    ...defaultSpinnerTokens,
    ...defaultStatusTokens,
    ...defaultTagTokens,
    ...defaultToastTokens,
    ...defaultAccordionTokens,
    ...defaultCarouselTokens,
    ...defaultModalTokens,
    ...defaultTooltipTokens,
    ...defaultToggleTipTokens,
    ...defaultTabTokens,
    ...defaultSideDrawerTokens,
    ...defaultGlobalHeaderTokens,
    ...defaultCardTokens,
    ...defaultTableTokens,
    ...defaultDropdownMenuTokens,
    ...defaultLozengeTokens,
    ...defaultGlobalNavigationTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}

export function isComponentToken(token: string): token is ComponentTokens {
    return token in defaultComponentTokens;
}
