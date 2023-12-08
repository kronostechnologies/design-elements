import { cleanIncompleteNumber, isValidValueForInput, isWithinPrecision, truncateAtPrecision } from './utils';

describe('NumericInput utils', () => {
    describe('truncateAtPrecision', () => {
        const tests = [
            { precision: 0, value: '', expected: '' },
            { precision: 0, value: '123.50', expected: '123' },
            { precision: 2, value: '123', expected: '123' },
            { precision: 2, value: '123.4567', expected: '123.45' },
        ];

        tests.forEach(({ precision, value, expected }) => {
            test(`should match expected (value: ${value}, precision: ${precision})`, () => {
                const result = truncateAtPrecision(value, precision);
                expect(result).toEqual(expected);
            });
        });
    });

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

        tests.forEach(({ value, expected }) => {
            test(`should match expected (value: ${value})`, () => {
                const result = cleanIncompleteNumber(value);
                expect(result).toEqual(expected);
            });
        });
    });

    describe('isWithinPrecision', () => {
        const validTests = [
            { precision: 0, value: '' },
            { precision: 2, value: '' },
            { precision: 2, value: '123.50' },
            { precision: 2, value: '123' },
        ];

        const invalidTests = [
            { precision: 0, value: '123.50' },
            { precision: 2, value: '123.4567' },
        ];

        validTests.forEach(({ precision, value }) => {
            test(`should return true (value: ${value}, precision: ${precision})`, () => {
                const result = isWithinPrecision(value, precision);
                expect(result).toBe(true);
            });
        });

        invalidTests.forEach(({ precision, value }) => {
            test(`should return false (value: ${value}, precision: ${precision})`, () => {
                const result = isWithinPrecision(value, precision);
                expect(result).toBe(false);
            });
        });
    });

    describe('isValidValueForInput', () => {
        const validTests = ['', '-', '.', '-.', '123', '12.', '123.4567', '.12', '-.12', '.000'];
        const invalidTests = ['abc', 'e', '123e'];

        validTests.forEach((value) => {
            test(`should return true (value: ${value})`, () => {
                const result = isValidValueForInput(value);
                expect(result).toBe(true);
            });
        });

        invalidTests.forEach((value) => {
            test(`should return false (value: ${value})`, () => {
                const result = isValidValueForInput(value);
                expect(result).toBe(false);
            });
        });
    });
});
