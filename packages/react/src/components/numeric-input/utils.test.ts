import { type ClipboardEvent } from 'react';
import {
    cleanIncompleteNumber,
    convertDecimalSeparator,
    DECIMAL_SEPARATORS,
    getDecimalSeparator,
    isValidValueForInput,
    replacePastedValue,
    toStandardFormat,
} from './utils';

describe('NumericInput utils', () => {
    describe('cleanIncompleteNumber', () => {
        const testsWithSeparator = DECIMAL_SEPARATORS.flatMap((separator) => ([
            { value: '', expected: '', separator },
            { value: '-', expected: '', separator },
            { value: '.', expected: '', separator },
            { value: '-.', expected: '', separator },
            { value: '123', expected: '123', separator },
            { value: '12.', expected: '12', separator },
            { value: '123.4567', expected: `123${separator}4567`, separator },
            { value: '.12', expected: `0${separator}12`, separator },
            { value: '-.12', expected: `-0${separator}12`, separator },
            { value: '.000', expected: `0${separator}000`, separator },
        ]));

        it.each(testsWithSeparator)(
            'should clean $value to $expected using "$separator" as separator',
            ({ value, expected, separator }) => {
                const result = cleanIncompleteNumber(value, separator);
                expect(result).toEqual(expected);
            },
        );
    });

    describe('replacePastedValue', () => {
        const tests = [
            {
                description: 'should replace selected text with pasted value',
                inputValue: '123.45',
                selectionStart: 1,
                selectionEnd: 5,
                pastedValue: '98.7',
                expected: '198.75',
            },
            {
                description: 'should insert pasted value at cursor position when no text is selected',
                inputValue: '12345',
                selectionStart: 2,
                selectionEnd: 2,
                pastedValue: '987',
                expected: '12987345',
            },
            {
                description: 'should replace entire value when all text is selected',
                inputValue: '12345',
                selectionStart: 0,
                selectionEnd: 5,
                pastedValue: '987',
                expected: '987',
            },
        ];

        it.each(tests)(
            '$description',
            ({
                inputValue,
                selectionStart,
                selectionEnd,
                pastedValue,
                expected,
            }) => {
                const event = {
                    clipboardData: {
                        getData: jest.fn().mockReturnValue(pastedValue),
                    },
                    currentTarget: {
                        value: inputValue,
                        selectionStart,
                        selectionEnd,
                    },
                } as unknown as ClipboardEvent<HTMLInputElement>;

                const result = replacePastedValue(event);

                expect(result).toEqual(expected);
            },
        );
    });

    describe('isValidValueForInput', () => {
        const validTestsWithDotSeparator = ['', '-', '.', '-.', '123', '12.', '123.4567', '.12', '-.12', '.000'];
        const invalidTestsWithDotSeparator = ['abc', 'e', '123e', '1.2.3'];

        it.each(validTestsWithDotSeparator)(
            'should return true with dot separator when (value: $value)',
            (value) => {
                const result = isValidValueForInput(value, '.');
                expect(result).toBe(true);
            },
        );

        it.each(invalidTestsWithDotSeparator)(
            'should return false with dot separator when (value: $value)',
            (value) => {
                const result = isValidValueForInput(value, '.');
                expect(result).toBe(false);
            },
        );

        const validTestsWithCommaSeparator = ['', '-', ',', '-,', '123', '12,', '123,4567', ',12', '-,12', ',000'];
        const invalidTestsWithCommaSeparator = ['abc', 'e', '123e', '1,2,3'];

        it.each(validTestsWithCommaSeparator)(
            'should return true with comma separator when (value: $value)',
            (value) => {
                const result = isValidValueForInput(value, ',');
                expect(result).toBe(true);
            },
        );

        it.each(invalidTestsWithCommaSeparator)(
            'should return false with comma separator when (value: $value)',
            (value) => {
                const result = isValidValueForInput(value, ',');
                expect(result).toBe(false);
            },
        );
    });

    describe('getDecimalSeparator', () => {
        it('should return "." for en-US', () => {
            expect(getDecimalSeparator('en-US')).toBe('.');
        });

        it('should return "," for fr-FR', () => {
            expect(getDecimalSeparator('fr-FR')).toBe(',');
        });

        it('should default to "." for unknown locale', () => {
            expect(getDecimalSeparator('unknown-locale')).toBe('.');
        });
    });

    describe('convertDecimalSeparator', () => {
        it('should convert last "." to ","', () => {
            expect(convertDecimalSeparator('123.45', ',')).toBe('123,45');
        });

        it('should convert last "," to "."', () => {
            expect(convertDecimalSeparator('123,45', '.')).toBe('123.45');
        });

        it('should not change if no separator present', () => {
            expect(convertDecimalSeparator('12345', ',')).toBe('12345');
        });

        it('should only replace the last separator', () => {
            expect(convertDecimalSeparator('1,234,567.89', ',')).toBe('1,234,567,89');
        });
    });

    describe('toStandardFormat', () => {
        it('should convert comma to dot', () => {
            expect(toStandardFormat('123,45')).toBe('123.45');
        });

        it('should keep dot as dot', () => {
            expect(toStandardFormat('123.45')).toBe('123.45');
        });
    });
});
