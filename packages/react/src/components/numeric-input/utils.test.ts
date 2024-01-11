import { cleanIncompleteNumber, isValidValueForInput } from './utils';

describe('NumericInput utils', () => {
    describe('cleanIncompleteNumber', () => {
        const tests = [
            { value: '', expected: '' },
            { value: '-', expected: '' },
            { value: '.', expected: '' },
            { value: '-.', expected: '' },
            { value: '123', expected: '123' },
            { value: '12.', expected: '12' },
            { value: '123.4567', expected: '123.4567' },
            { value: '.12', expected: '0.12' },
            { value: '-.12', expected: '-0.12' },
            { value: '.000', expected: '0.000' },
        ];

        test.each(tests)(
            'should match expected (value: $value)',
            ({ value, expected }) => {
                const result = cleanIncompleteNumber(value);
                expect(result).toEqual(expected);
            },
        );
    });

    describe('isValidValueForInput', () => {
        const validTests = ['', '-', '.', '-.', '123', '12.', '123.4567', '.12', '-.12', '.000'];
        const invalidTests = ['abc', 'e', '123e'];

        test.each(validTests)(
            'should return true when (value: $value)',
            (value) => {
                const result = isValidValueForInput(value);
                expect(result).toBe(true);
            },
        );

        test.each(invalidTests)(
            'should return false when (value: $value)',
            (value) => {
                const result = isValidValueForInput(value);
                expect(result).toBe(false);
            },
        );
    });
});
