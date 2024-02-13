import { AliasTokens } from './alias-tokens';
import { ButtonTokens, defaultButtonTokens } from './component/button-tokens';
import { CheckboxTokens, defaultCheckboxTokens } from './component/checkbox-tokens';
import { ChooserTokens, defaultChooserTokens } from './component/chooser-tokens';
import { ComboboxTokens, defaultComboboxTokens } from './component/combobox-tokens';
import { DatepickerTokens, defaultDatepickerTokens } from './component/datepicker-tokens';
import { defaultDropdownListTokens, DropdownListTokens } from './component/dropdown-list-tokens';
import { defaultFocusTokens, FocusTokens } from './component/focus-tokens';
import { defaultHeadingTokens, HeadingTokens } from './component/heading-tokens';
import { defaultLabelTokens, LabelTokens } from './component/label-tokens';
import { defaultListboxTokens, ListboxTokens } from './component/listbox-tokens';
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
    | ComboboxTokens;

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
};

export type ResolvedComponentTokenValue = RefTokenValue;

export type ResolvedComponentTokens = {
    [Token in ComponentTokens]: ResolvedComponentTokenValue;
}
