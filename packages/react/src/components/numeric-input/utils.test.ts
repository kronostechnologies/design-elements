import { type ClipboardEvent } from 'react';
import { cleanIncompleteNumber, isValidValueForInput, replacePastedValue } from './utils';

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

        test.each(tests)(
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
