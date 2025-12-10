import { DropdownListOption } from '../../dropdown-list';
import { ListboxOption } from '../listbox';
import {
    disableNonSelectedOptions,
    getDefaultOptions,
    getOptionLabel,
    isOptionEnabled,
    isOptionSelected,
    optionsAreEqual,
} from './listbox-utils';

type ListOption = ListboxOption | DropdownListOption;

describe('Dropdown List utils', () => {
    describe('optionAreEqual', () => {
        test('should return true when options are equal', () => {
            const option1 = { value: '1', label: 'Option 1' };
            const option2 = { value: '1', label: 'Option 1' };

            const result: boolean = optionsAreEqual(option1, option2);

            expect(result).toBe(true);
        });

        test('should return false when options values are not equal', () => {
            const option1 = { value: '1', label: 'Option 1' };
            const option2 = { value: '2', label: 'Option 2' };

            const result: boolean = optionsAreEqual(option1, option2);

            expect(result).toBe(false);
        });
    });

    describe('isOptionEnabled', () => {
        test('should return false when option is disabled', () => {
            const option = { value: '1', label: 'Option 1', disabled: true };

            const result: boolean = isOptionEnabled(option);

            expect(result).toBe(false);
        });

        test('should return true when option is not disabled', () => {
            const option = { value: '1', label: 'Option 1', disabled: false };

            const result: boolean = isOptionEnabled(option);

            expect(result).toBe(true);
        });
    });

    describe('disableNonSelectedOptions', () => {
        test('should disable non-selected options', () => {
            const options = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
            ];
            const selectedOptions = [{ value: '1', label: 'Option 1' }];

            const result = disableNonSelectedOptions(options, selectedOptions);

            expect(result).toEqual([
                { value: '1', label: 'Option 1', disabled: false },
                { value: '2', label: 'Option 2', disabled: true },
                { value: '3', label: 'Option 3', disabled: true },
            ]);
        });

        test('should not enabled options that are already disabled', () => {
            const options = [
                { value: '1', label: 'Option 1', disabled: true },
                { value: '2', label: 'Option 2', disabled: true },
                { value: '3', label: 'Option 3' },
            ];
            const selectedOptions = [{ value: '1', label: 'Option 1' }];

            const result = disableNonSelectedOptions(options, selectedOptions);

            expect(result).toEqual([
                { value: '1', label: 'Option 1', disabled: true },
                { value: '2', label: 'Option 2', disabled: true },
                { value: '3', label: 'Option 3', disabled: true },
            ]);
        });

        test('should not disabled options when no options are selected', () => {
            const options = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
            ];

            const result = disableNonSelectedOptions(options, []);

            expect(result).toEqual([
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
                { value: '3', label: 'Option 3' },
            ]);
        });
    });

    describe('getDefaultOptions', () => {
        test('should return options matching the provided value when value is a string', () => {
            const options: ListOption[] = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ];

            const result = getDefaultOptions('1', options, false, true);

            expect(result).toEqual([{ value: '1', label: 'Option 1' }]);
        });

        test('should return options matching the provided value when value is an array of strings', () => {
            const options: ListOption[] = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ];

            const result = getDefaultOptions(['1', '2'], options, false, true);

            expect(result).toEqual([
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ]);
        });

        test('should return the first enabled option when value is undefined and multiselect is false', () => {
            const options: ListOption[] = [
                { value: '1', label: 'Option 1', disabled: true },
                { value: '2', label: 'Option 2', disabled: false },
            ];

            const result = getDefaultOptions(undefined, options, false, true);

            expect(result).toEqual([{ value: '2', label: 'Option 2', disabled: false }]);
        });

        test('should return an empty option when no enabled options exist and value is undefined', () => {
            const options: ListOption[] = [
                { value: '1', label: 'Option 1', disabled: true },
                { value: '2', label: 'Option 2', disabled: true },
            ];

            const result = getDefaultOptions(undefined, options, false, true);

            expect(result).toEqual([{ value: '', label: '' }]);
        });

        test('should return undefined when value is undefined and multiselect is true', () => {
            const options: ListOption[] = [
                { value: '1', label: 'Option 1', disabled: false },
                { value: '2', label: 'Option 2', disabled: false },
            ];

            const result = getDefaultOptions(undefined, options, true, true);

            expect(result).toBeUndefined();
        });

        test('should return empty list when no matching options are found for the provided value', () => {
            const options: ListOption[] = [
                { value: '1', label: 'Option 1' },
                { value: '2', label: 'Option 2' },
            ];

            const result = getDefaultOptions('3', options, false, true);

            expect(result).toEqual([]);
        });
    });

    describe('getOptionLabel', () => {
        test('should return the label of the option', () => {
            const option: ListOption = { value: '1', label: 'Option 1' };

            const result = getOptionLabel(option);

            expect(result).toBe('Option 1');
        });
    });

    describe('isOptionSelected', () => {
        test('should return true when the option is selected', () => {
            const option: ListOption = { value: '1', label: 'Option 1' };
            const selectedOptions: ListOption[] = [{ value: '1', label: 'Option 1' }];

            const result = isOptionSelected(option, selectedOptions);

            expect(result).toBe(true);
        });

        test('should return false when the option is not selected', () => {
            const option: ListOption = { value: '1', label: 'Option 1' };
            const selectedOptions: ListOption[] = [{ value: '2', label: 'Option 2' }];

            const result = isOptionSelected(option, selectedOptions);

            expect(result).toBe(false);
        });

        test('should return false when selectedOptions is undefined', () => {
            const option: ListOption = { value: '1', label: 'Option 1' };

            const result = isOptionSelected(option, undefined);

            expect(result).toBe(false);
        });
    });
});
