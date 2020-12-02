import { clamp, isNumber, toInt } from '@design-elements/utils/math';

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
});
