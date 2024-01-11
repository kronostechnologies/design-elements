import { clamp, isNumber, isWithinPrecision, toInt, truncateAtPrecision } from './math';

describe('math', () => {
    describe('isNumber', () => {
        it.each`
            value           | expected
            ${-Infinity}    | ${false}
            ${NaN}          | ${false}
            ${0}            | ${true}
            ${'1'}          | ${false}
            ${100}          | ${true}
            ${100.25}       | ${true}
            ${Infinity}     | ${false}
        `('should return $expected when value is $value', ({ value, expected }) => {
            const result = isNumber(value);

            expect(result).toEqual(expected);
        });
    });

    describe('toInt', () => {
        it('should return 0 when value is 0', () => {
            const result = toInt('0', 1);

            expect(result).toEqual(0);
        });

        it('should use fallback value when it is not a number', () => {
            const result = toInt('', 1);

            expect(result).toEqual(1);
        });

        it('should return value when it is a number', () => {
            const result = toInt(10, 1);

            expect(result).toEqual(10);
        });
    });

    describe('clamp', () => {
        it.each`
            value   | min   | max   | expected
            ${-4}   | ${-3} | ${3}  | ${-3}
            ${-1}   | ${-3} | ${3}  | ${-1}
            ${4}    | ${-3} | ${3}  | ${3}
        `('should return $expected when value is $value and bound are ($min, $max)', ({
            value, min, max, expected,
        }) => {
            const result = clamp(value, min, max);

            expect(result).toEqual(expected);
        });
    });

    describe('truncateAtPrecision', () => {
        const tests = [
            { value: '', precision: 0, expected: '' },
            { value: '', precision: 2, expected: '' },
            { value: '123.50', precision: 0, expected: '123' },
            { value: '123', precision: 2, expected: '123' },
            { value: '123.4567', precision: 2, expected: '123.45' },
        ];

        test.each(tests)(
            'should return $expected when (value: $value, precision: $precision)',
            ({ precision, value, expected }) => {
                const result = truncateAtPrecision(value, precision);
                expect(result).toEqual(expected);
            },
        );
    });

    describe('isWithinPrecision', () => {
        const validTests = [
            { precision: 0, value: '' },
            { precision: 2, value: '' },
            { precision: 2, value: '123.50' },
            { precision: 2, value: '123' },
        ];

        test.each(validTests)(
            'should return true when (value: $value, precision: $precision)',
            ({ precision, value }) => {
                const result = isWithinPrecision(value, precision);
                expect(result).toBe(true);
            },
        );

        const invalidTests = [
            { precision: 0, value: '123.50' },
            { precision: 2, value: '123.4567' },
        ];

        test.each(invalidTests)(
            'should return false when (value: $value, precision: $precision)',
            ({ precision, value }) => {
                const result = isWithinPrecision(value, precision);
                expect(result).toBe(false);
            },
        );
    });
});
