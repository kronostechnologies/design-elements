import { AccordionToken, defaultAccordionTokens } from './component/accordion-tokens';
import { AvatarToken, defaultAvatarTokens } from './component/avatar-tokens';
import { BadgeToken, defaultBadgeTokens } from './component/badge-tokens';
import { BentoMenuButtonToken, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { BreadcrumbToken, defaultBreadcrumbTokens } from './component/breadcrumb-tokens';
import { ButtonToken, defaultButtonTokens } from './component/button-tokens';
import { CaptionToken, defaultCaptionTokens } from './component/caption-tokens';
import { CardToken, defaultCardTokens } from './component/card-tokens';
import { CarouselToken, defaultCarouselTokens } from './component/carousel-tokens';
import { CheckboxToken, defaultCheckboxTokens } from './component/checkbox-tokens';
import { ChooserToken, defaultChooserTokens } from './component/chooser-tokens';
import { ComboboxToken, defaultComboboxTokens } from './component/combobox-tokens';
import { DatepickerToken, defaultDatepickerTokens } from './component/datepicker-tokens';
import { defaultDisclosureTokens, DisclosureToken } from './component/disclosure-tokens';
import { defaultDropdownListTokens, DropdownListToken } from './component/dropdown-list-tokens';
import { defaultDropdownMenuTokens, DropdownMenuToken } from './component/dropdown-menu-tokens';
import { defaultFieldTokens, FieldToken } from './component/field-tokens';
import { defaultFilterTokens, type FilterToken } from './component/filter-tokens';
import { defaultFocusTokens, FocusToken } from './component/focus-tokens';
import { defaultGlobalBannerTokens, GlobalBannerToken } from './component/global-banner-tokens';
import { defaultGlobalHeaderTokens, GlobalHeaderToken } from './component/global-header-tokens';
import { defaultHeadingTokens, HeadingToken } from './component/heading-tokens';
import { defaultLabelTokens, LabelToken } from './component/label-tokens';
import { defaultLegendTokens, LegendToken } from './component/legend-tokens';
import { defaultLinkTokens, LinkToken } from './component/link-tokens';
import { defaultListboxTokens, ListboxToken } from './component/listbox-tokens';
import { defaultLozengeTokens, LozengeToken } from './component/lozenge-tokens';
import { defaultMenuTokens, MenuToken } from './component/menu-tokens';
import { defaultModalTokens, ModalToken } from './component/modal-tokens';
import { defaultNavListTokens, NavListToken } from './component/nav-list-tokens';
import { defaultNumericInputTokens, NumericInputToken } from './component/numeric-input-tokens';
import { defaultPaginationTokens, PaginationToken } from './component/pagination-tokens';
import { defaultPasswordInputTokens, PasswordInputToken } from './component/password-input-tokens';
import { defaultPhoneInputTokens, PhoneInputToken } from './component/phone-input-tokens';
import { defaultProgressCircularTokens, ProgressCircularToken } from './component/progress-circular-tokens';
import { defaultProgressIndicatorTokens, ProgressIndicatorToken } from './component/progress-indicator-tokens';
import { defaultProgressTokens, ProgressToken } from './component/progress-tokens';
import { defaultRadioButtonGroupTokens, RadioButtonGroupToken } from './component/radio-button-group-tokens';
import { defaultRadioCardTokens, RadioCardToken } from './component/radio-card-tokens';
import { defaultSearchInputTokens, SearchInputToken } from './component/search-input-tokens';
import { defaultSectionalBannerTokens, SectionalBannerToken } from './component/sectional-banner-tokens';
import { defaultSegmentedControlTokens, SegmentedControlToken } from './component/segmented-control-tokens';
import { defaultSideDrawerTokens, SideDrawerToken } from './component/side-drawer-tokens';
import { defaultSliderTokens, SliderToken } from './component/slider-tokens';
import { defaultSpinnerTokens, SpinnerToken } from './component/spinner-tokens';
import { defaultStepperTokens, StepperToken } from './component/stepper-tokens';
import { defaultTabTokens, TabToken } from './component/tab-tokens';
import { defaultTableTokens, TableToken } from './component/table-tokens';
import { defaultTagTokens, TagToken } from './component/tag-tokens';
import { defaultTextAreaTokens, TextAreaToken } from './component/text-area-tokens';
import { defaultTextInputTokens, TextInputToken } from './component/text-input-tokens';
import { defaultToastTokens, ToastToken } from './component/toast-tokens';
import { defaultToggleSwitchTokens, ToggleSwitchToken } from './component/toggle-switch-tokens';
import { defaultToggleButtonTokens, ToggleButtonToken } from './component/toggle-button-tokens';
import { defaultToggleTipTokens, ToggleTipToken } from './component/toggletip-tokens';
import { defaultTooltipTokens, TooltipToken } from './component/tooltip-tokens';

export type ComponentToken =
    | AccordionToken
    | AvatarToken
    | BadgeToken
    | BentoMenuButtonToken
    | BreadcrumbToken
    | ButtonToken
    | CaptionToken
    | CardToken
    | CarouselToken
    | CheckboxToken
    | ChooserToken
    | ComboboxToken
    | DatepickerToken
    | DisclosureToken
    | DropdownListToken
    | DropdownMenuToken
    | FieldToken
    | FilterToken
    | FocusToken
    | GlobalBannerToken
    | GlobalHeaderToken
    | HeadingToken
    | LabelToken
    | LegendToken
    | LinkToken
    | ListboxToken
    | LozengeToken
    | MenuToken
    | ModalToken
    | NavListToken
    | NumericInputToken
    | PaginationToken
    | PasswordInputToken
    | ProgressCircularToken
    | ProgressIndicatorToken
    | ProgressToken
    | PhoneInputToken
    | RadioButtonGroupToken
    | RadioCardToken
    | SearchInputToken
    | SectionalBannerToken
    | SegmentedControlToken
    | SideDrawerToken
    | SliderToken
    | SpinnerToken
    | StepperToken
    | TableToken
    | TabToken
    | TagToken
    | TextAreaToken
    | TextInputToken
    | ToastToken
    | ToggleSwitchToken
    | ToggleButtonToken
    | ToggleTipToken
    | TooltipToken;

export const defaultComponentTokens = {
    ...defaultAccordionTokens,
    ...defaultAvatarTokens,
    ...defaultBadgeTokens,
    ...defaultBentoMenuButtonTokens,
    ...defaultBreadcrumbTokens,
    ...defaultButtonTokens,
    ...defaultCardTokens,
    ...defaultCaptionTokens,
    ...defaultCarouselTokens,
    ...defaultCheckboxTokens,
    ...defaultChooserTokens,
    ...defaultComboboxTokens,
    ...defaultDatepickerTokens,
    ...defaultDisclosureTokens,
    ...defaultDropdownListTokens,
    ...defaultDropdownMenuTokens,
    ...defaultFieldTokens,
    ...defaultFilterTokens,
    ...defaultFocusTokens,
    ...defaultGlobalBannerTokens,
    ...defaultGlobalHeaderTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
    ...defaultLegendTokens,
    ...defaultLinkTokens,
    ...defaultListboxTokens,
    ...defaultLozengeTokens,
    ...defaultMenuTokens,
    ...defaultModalTokens,
    ...defaultNavListTokens,
    ...defaultNumericInputTokens,
    ...defaultPaginationTokens,
    ...defaultPasswordInputTokens,
    ...defaultPhoneInputTokens,
    ...defaultProgressCircularTokens,
    ...defaultProgressIndicatorTokens,
    ...defaultProgressTokens,
    ...defaultRadioButtonGroupTokens,
    ...defaultRadioCardTokens,
    ...defaultSearchInputTokens,
    ...defaultSectionalBannerTokens,
    ...defaultSegmentedControlTokens,
    ...defaultSideDrawerTokens,
    ...defaultSliderTokens,
    ...defaultSpinnerTokens,
    ...defaultStepperTokens,
    ...defaultTableTokens,
    ...defaultTabTokens,
    ...defaultTagTokens,
    ...defaultTextAreaTokens,
    ...defaultTextInputTokens,
    ...defaultToastTokens,
    ...defaultToggleSwitchTokens,
    ...defaultToggleButtonTokens,
    ...defaultToggleTipTokens,
    ...defaultTooltipTokens,
};
