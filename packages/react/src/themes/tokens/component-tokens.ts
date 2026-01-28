import { AliasTokens } from './alias-tokens';
import { AvatarTokens, defaultAvatarTokens } from './component/avatar-tokens';
import { BentoMenuButtonTokens, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { BreadcrumbTokens, defaultBreadcrumbTokens } from './component/breadcrumb-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CheckboxTokens, defaultCheckboxTokens } from './component/checkbox-tokens';
import { ChooserTokens, defaultChooserTokens } from './component/chooser-tokens';
import { ComboboxTokens, defaultComboboxTokens } from './component/combobox-tokens';
import { DatepickerTokens, defaultDatepickerTokens } from './component/datepicker-tokens';
import { defaultDisclosureTokens, DisclosureTokens } from './component/disclosure-tokens';
import { defaultDropdownListTokens, DropdownListTokens } from './component/dropdown-list-tokens';
import { CardTokens, defaultCardTokens } from './component/card-tokens';
import { defaultDropdownMenuTokens, DropdownMenuTokens } from './component/dropdown-menu-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultGlobalHeaderTokens, GlobalHeaderTokens } from './component/global-header-tokens';
import { defaultGlobalNavigationTokens, GlobalNavigationTokens } from './component/global-navigation-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultFieldTokens, FieldTokens } from './component/field-tokens';
import { defaultLinkTokens, LinkTokens } from './component/link-tokens';
import { defaultProgressTokens, ProgressTokens } from './component/progress-tokens';
import { defaultTextInputTokens, TextInputTokens } from './component/text-input-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultListboxTokens, ListboxTokens } from './component/listbox-tokens';
import { defaultMenuTokens, MenuTokens } from './component/menu-tokens';
import { defaultNumericInputTokens, NumericInputTokens } from './component/numeric-input-tokens';
import { defaultPasswordInputTokens, PasswordInputTokens } from './component/password-input-tokens';
import { defaultPhoneInputTokens, PhoneInputTokens } from './component/phone-input-tokens';
import { defaultProgressCircularTokens, ProgressCircularTokens } from './component/progress-circular-tokens';
import { defaultRadioButtonGroupTokens, RadioButtonGroupTokens } from './component/radio-button-group-tokens';
import { defaultRadioCardTokens, RadioCardTokens } from './component/radio-card-tokens';
import { defaultSearchInputTokens, SearchInputTokens } from './component/search-input-tokens';
import { defaultStepperTokens, StepperTokens } from './component/stepper-tokens';
import { defaultTextAreaTokens, TextAreaTokens } from './component/text-area-tokens';
import { defaultSegmentedControlTokens, SegmentedControlTokens } from './component/segmented-control-tokens';
import { defaultToggleSwitchTokens, ToggleSwitchTokens } from './component/toggle-switch-tokens';
import { defaultLegendTokens, LegendTokens } from './component/legend-tokens';
import { defaultLozengeTokens, LozengeTokens } from './component/lozenge-tokens';
import { defaultNavListTokens, NavListTokens } from './component/nav-list-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
import { defaultSideDrawerTokens, SideDrawerTokens } from './component/side-drawer-tokens';
import { defaultTableTokens, TableTokens } from './component/table-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';
import { BadgeTokens, defaultBadgeTokens } from './component/badge-tokens';
import { defaultGlobalBannerTokens, GlobalBannerTokens } from './component/global-banner-tokens';
import { defaultSectionalBannerTokens, SectionalBannerTokens } from './component/sectional-banner-tokens';
import { defaultSpinnerTokens, SpinnerTokens } from './component/spinner-tokens';
import { defaultStatusTokens, StatusTokens } from './component/status-tokens';
import { defaultTagTokens, TagTokens } from './component/tag-tokens';
import { defaultToastTokens, ToastTokens } from './component/toast-tokens';
import { AccordionTokens, defaultAccordionTokens } from './component/accordion-tokens';
import { CarouselTokens, defaultCarouselTokens } from './component/carousel-tokens';
import { defaultModalTokens, ModalTokens } from './component/modal-tokens';
import { defaultTooltipTokens, TooltipTokens } from './component/tooltip-tokens';
import { defaultToggleButtonTokens, ToggleButtonToken } from './component/toggle-button-tokens';
import { defaultToggleTipTokens, ToggleTipTokens } from './component/toggletip-tokens';
import { defaultTabTokens, TabTokens } from './component/tab-tokens';
import { defaultSliderTokens, SliderTokens } from './component/slider-tokens';

export type ComponentTokens =
    | AvatarTokens
    | BentoMenuButtonTokens
    | ButtonTokens
    | BreadcrumbTokens
    | DisclosureTokens
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
    | SegmentedControlTokens
    | ToggleSwitchTokens
    | TextInputTokens
    | RadioCardTokens
    | LegendTokens
    | NavListTokens
    | PaginationTokens
    | ProgressTokens
    | ProgressCircularTokens
    | LinkTokens
    | BadgeTokens
    | GlobalBannerTokens
    | SectionalBannerTokens
    | SliderTokens
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
    | GlobalNavigationTokens
    | ToggleButtonToken;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultAvatarTokens,
    ...defaultBentoMenuButtonTokens,
    ...defaultButtonTokens,
    ...defaultDisclosureTokens,
    ...defaultFocusTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultLegendTokens,
    ...defaultNavListTokens,
    ...defaultPaginationTokens,
    ...defaultProgressTokens,
    ...defaultProgressCircularTokens,
    ...defaultLinkTokens,
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
    ...defaultSegmentedControlTokens,
    ...defaultToggleSwitchTokens,
    ...defaultTextInputTokens,
    ...defaultRadioCardTokens,
    ...defaultBadgeTokens,
    ...defaultGlobalBannerTokens,
    ...defaultSectionalBannerTokens,
    ...defaultSliderTokens,
    ...defaultSpinnerTokens,
    ...defaultStatusTokens,
    ...defaultTagTokens,
    ...defaultToastTokens,
    ...defaultAccordionTokens,
    ...defaultCarouselTokens,
    ...defaultModalTokens,
    ...defaultTooltipTokens,
    ...defaultToggleButtonTokens,
    ...defaultToggleTipTokens,
    ...defaultTabTokens,
    ...defaultSideDrawerTokens,
    ...defaultGlobalHeaderTokens,
    ...defaultCardTokens,
    ...defaultTableTokens,
    ...defaultDropdownMenuTokens,
    ...defaultLozengeTokens,
    ...defaultGlobalNavigationTokens,
    ...defaultBreadcrumbTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}

export function isComponentToken(token: string): token is ComponentTokens {
    return token in defaultComponentTokens;
}
