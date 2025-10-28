import { includes, unique } from '../../../utils/array';
import { findOptionsByValue } from '../../listbox/listbox-option';
import type { DropdownListOption } from '../dropdown-list';

export function optionsAreEqual(
    option: DropdownListOption,
    optionToCompare: DropdownListOption,
): boolean {
    return option.value === optionToCompare.value;
}

export function addUniqueOption(
    newOption: DropdownListOption,
    options?: DropdownListOption[],
): DropdownListOption[] {
    if (!options) {
        return [newOption];
    }

    return unique([...options, newOption], optionsAreEqual);
}

export function removeOption(
    optionToRemove: DropdownListOption,
    options?: DropdownListOption[],
): DropdownListOption[] {
    if (!options) {
        return [];
    }

    return options.filter((option) => !optionsAreEqual(option, optionToRemove));
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
        const optionIsSelected = includes(selectedOptions, option, optionsAreEqual);

        return ({
            ...option,
            disabled: option.disabled || !optionIsSelected,
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

export function getOptionLabel(option: DropdownListOption): string {
    return option.label;
}

export function isOptionSelected(
    option: DropdownListOption,
    selectedOptions: DropdownListOption[] | undefined,
): boolean {
    if (!selectedOptions) {
        return false;
    }

    return includes(selectedOptions, option, optionsAreEqual);
}
