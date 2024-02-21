import { AliasTokens } from './alias-tokens';
import { BentoMenuButtonTokens, defaultBentoMenuButtonTokens } from './component/bento-menu-button-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CheckboxTokens, defaultCheckboxTokens } from './component/checkbox-tokens';
import { ChooserTokens, defaultChooserTokens } from './component/chooser-tokens';
import { ComboboxTokens, defaultComboboxTokens } from './component/combobox-tokens';
import { DatepickerTokens, defaultDatepickerTokens } from './component/datepicker-tokens';
import { defaultDropdownListTokens, DropdownListTokens } from './component/dropdown-list-tokens';
import { CardLinkTokens, defaultCardLinkTokens } from './component/card-link-tokens';
import { defaultExternalLinkTokens, ExternalLinkTokens } from './component/external-link-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultFieldTokens, FieldTokens } from './component/field-tokens';
import { defaultInputsTokens, InputsTokens } from './component/inputs-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultListboxTokens, ListboxTokens } from './component/listbox-tokens';
import { defaultMenuTokens, MenuTokens } from './component/menu-tokens';
import { defaultNumericInputTokens, NumericInputTokens } from './component/numeric-input-tokens';
import { defaultPasswordInputTokens, PasswordInputTokens } from './component/password-input-tokens';
import { defaultPhoneInputTokens, PhoneInputTokens } from './component/phone-input-tokens';
import { defaultRadioButtonGroupTokens, RadioButtonGroupTokens } from './component/radio-button-group-tokens';
import { defaultRadioCardTokens, RadioCardTokens } from './component/radio-card-tokens';
import { defaultSearchInputTokens, SearchInputTokens } from './component/search-input-tokens';
import { defaultStepperInputTokens, StepperInputTokens } from './component/stepper-input-tokens';
import { defaultTextAreaTokens, TextAreaTokens } from './component/text-area-tokens';
import { defaultToggleButtonGroupTokens, ToggleButtonGroupTokens } from './component/toggle-button-group-tokens';
import { defaultToggleSwitchTokens, ToggleSwitchTokens } from './component/toggle-switch-tokens';
import { defaultNavListTokens, NavListTokens } from './component/nav-list-tokens';
import { defaultNavListItemTokens, NavListItemTokens } from './component/nav-list-item-tokens';
import { defaultPaginationTokens, PaginationTokens } from './component/pagination-tokens';
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
    | StepperInputTokens
    | TextAreaTokens
    | FieldTokens
    | RadioButtonGroupTokens
    | ToggleButtonGroupTokens
    | ToggleSwitchTokens
    | InputsTokens
    | RadioCardTokens
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
    | ToastContainerTokens;

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
    ...defaultStepperInputTokens,
    ...defaultTextAreaTokens,
    ...defaultFieldTokens,
    ...defaultRadioButtonGroupTokens,
    ...defaultToggleButtonGroupTokens,
    ...defaultToggleSwitchTokens,
    ...defaultInputsTokens,
    ...defaultRadioCardTokens,
    ...defaultBadgeTokens,
    ...defaultGlobalBannerTokens,
    ...defaultSectionalBannerTokens,
    ...defaultSpinnerTokens,
    ...defaultTagTokens,
    ...defaultToastContainerTokens,
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
