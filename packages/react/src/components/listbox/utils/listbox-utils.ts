import { includes, unique } from '../../../utils/array';

type Value = string | string[];

export function optionsAreEqual<T extends { value: string }>(
    option: T,
    optionToCompare: T,
): boolean {
    return option.value?.toLowerCase() === optionToCompare.value?.toLowerCase();
}

export function addUniqueOption<T extends { value: string }>(
    newOption: T,
    options?: T[],
): T[] {
    if (!options) {
        return [newOption];
    }

    return unique([...options, newOption], optionsAreEqual);
}

export function removeOption<T extends { value: string }>(
    optionToRemove: T,
    options?: T[],
): T[] {
    if (!options) {
        return [];
    }

    return options.filter((option) => !optionsAreEqual(option, optionToRemove));
}

export function isOptionEnabled<T extends { disabled?: boolean }>(option: T): boolean {
    return !option.disabled;
}

export function disableNonSelectedOptions<T extends { disabled?: boolean, value: string }>(
    options: T[],
    selectedOptions: T[],
): T[] {
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

export function findOptionsByValue<T extends { value: string }>(
    options: T[],
    searchValue?: Value | undefined,
): T[] {
    return options.filter(
        (option) => (Array.isArray(searchValue)
            ? searchValue.includes(option.value)
            : option.value === searchValue),
    );
}

export function createCustomOption<T extends { value: string; label?: string }>(
    value: string,
    label?: string,
): T {
    return { value, label } as T;
}

export function getDefaultOptions<T extends { value: string, label?: string, disabled?: boolean }>(
    searchValue: Value | undefined,
    options: T[],
    multiselect?: boolean,
    forceSelectDefaultOption: boolean = false,
): T[] | undefined {
    let defaultOptions: T[] | undefined;

    if (searchValue !== undefined) {
        defaultOptions = findOptionsByValue(options, searchValue);
    }

    if (defaultOptions === undefined && !multiselect && forceSelectDefaultOption) {
        defaultOptions = [options.find(isOptionEnabled) ?? createCustomOption('', '')];
    }

    return defaultOptions;
}

export function getOptionLabel<T extends { label?: string }>(option: T): string {
    return option.label ?? '';
}

export function getValueAsString(value: Value | undefined): string {
    return Array.isArray(value) ? value[0] : value ?? '';
}

export function getValueAsStringArray(value: Value | undefined): string[] {
    if (Array.isArray(value)) {
        return value;
    }
    if (value) {
        return [value];
    }
    return [];
}

export function isOptionSelected<T extends { value: string }>(
    option: T,
    selectedOptions?: T[],
): boolean {
    if (!selectedOptions) {
        return false;
    }

    return includes(selectedOptions, option, optionsAreEqual);
}

export function getNewOptionSelection<T extends { value: string }>(
    option: T,
    selectedOptions?: T[],
    forceSelected?: boolean,
): T[] {
    return !isOptionSelected(option, selectedOptions) || forceSelected
        ? addUniqueOption(option, selectedOptions)
        : removeOption(option, selectedOptions);
}

export function getSelectedOptionValues<T extends { value: string }>(
    selectedOptions?: T[],
): string[] | undefined {
    return selectedOptions?.map(
        (option) => option?.value ?? '',
    );
}

export function getJoinedValues<T extends { value: string }>(
    selectedOptions?: T[],
): string {
    return getSelectedOptionValues(selectedOptions)?.join('|') ?? '';
}
