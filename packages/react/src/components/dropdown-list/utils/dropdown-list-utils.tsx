import { findOptionsByValue } from '../../listbox/listbox-option';
import { includes } from '../../../utils/array';
import { DropdownListOption } from '../dropdown-list-option';

export function optionAreEqual(
    option: DropdownListOption,
    optionToCompared: DropdownListOption,
): boolean {
    return option.value === optionToCompared.value;
}

export function isOptionEnabled(option: DropdownListOption): boolean {
    return !option.disabled;
}

export function disableNonSelectedOptions(
    options: DropdownListOption[],
    selectedOptions: DropdownListOption[],
): DropdownListOption[] {
    if (selectedOptions.length === 0) {
        return options;
    }

    return options.map((option) => {
        const isOptionSelected = includes(selectedOptions, option, optionAreEqual);

        return ({
            ...option,
            disabled: option.disabled || !isOptionSelected,
        });
    });
}

export function getDefaultOptions(
    value: string | string[] | undefined,
    options: DropdownListOption[],
    multiselect?: boolean,
): DropdownListOption[] | undefined {
    let defaultOptions: DropdownListOption[] | undefined;

    if (value !== undefined) {
        defaultOptions = findOptionsByValue(options, value);
    }

    if (defaultOptions === undefined && !multiselect) {
        defaultOptions = [options.find(isOptionEnabled) ?? { value: '', label: '' }];
    }

    return defaultOptions;
}
