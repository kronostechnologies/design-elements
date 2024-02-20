import { AliasTokens } from './alias-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CheckboxTokens, defaultCheckboxTokens } from './component/checkbox-tokens';
import { ChooserTokens, defaultChooserTokens } from './component/chooser-tokens';
import { ComboboxTokens, defaultComboboxTokens } from './component/combobox-tokens';
import { DatepickerTokens, defaultDatepickerTokens } from './component/datepicker-tokens';
import { defaultDropdownListTokens, DropdownListTokens } from './component/dropdown-list-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultFieldTokens, FieldTokens } from './component/field-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultListboxTokens, ListboxTokens } from './component/listbox-tokens';
import { defaultMenuTokens, MenuTokens } from './component/menu-tokens';
import { defaultNumericInputTokens, NumericInputTokens } from './component/numeric-input-tokens';
import { defaultPasswordInputTokens, PasswordInputTokens } from './component/password-input-tokens';
import { defaultPhoneInputTokens, PhoneInputTokens } from './component/phone-input-tokens';
import { defaultRadioButtonGroupTokens, RadioButtonGroupTokens } from './component/radio-button-group-tokens';
import { defaultSearchInputTokens, SearchInputTokens } from './component/search-input-tokens';
import { defaultStepperInputTokens, StepperInputTokens } from './component/stepper-input-tokens';
import { defaultTextAreaTokens, TextAreaTokens } from './component/text-area-tokens';
import { defaultToggleButtonGroupTokens, ToggleButtonGroupTokens } from './component/toggle-button-group-tokens';
import { defaultToggleSwitchTokens, ToggleSwitchTokens } from './component/toggle-switch-tokens';
import { RefTokens, RefTokenValue } from './ref-tokens';

export type ComponentTokens =
    | ButtonTokens
    | HeadingTokens
    | LabelTokens
    | FocusTokens
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
    | ToggleSwitchTokens;

export type ComponentTokenValue = AliasTokens | RefTokens;

export type ComponentTokenMap = {
    [Token in ComponentTokens]: ComponentTokenValue;
}

export const defaultComponentTokens: ComponentTokenMap = {
    ...defaultButtonTokens,
    ...defaultHeadingTokens,
    ...defaultLabelTokens,
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
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
