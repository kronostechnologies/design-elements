import { cleanIncompleteNumber, truncateAtPrecision } from './utils';

describe('Test NumericInput utils', () => {
    test('should truncateAtPrecision return expected results', () => {
        const tests = [
            { precision: 0, value: '', expected: '' },
            { precision: 0, value: '123.50', expected: '123' },
            { precision: 2, value: '123', expected: '123' },
            { precision: 2, value: '123.4567', expected: '123.45' },
        ];

        tests.forEach(({ precision, value, expected }) => {
            const result = truncateAtPrecision(precision, value);
            expect(result).toEqual(expected);
        });
    });

    test('should cleanIncompleteNumber return expected results', () => {
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
            const result = cleanIncompleteNumber(value);
            expect(result).toEqual(expected);
        });
    });
});
