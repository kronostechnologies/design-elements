import { getNextElement, getPreviousElement, unique } from './array';

describe('array', () => {
    describe('getNextElement', () => {
        test('returns next element in array', () => {
            expect(getNextElement([0, 1, 2, 3, 4], 3)).toBe(4);
        });

        test('returns first element in array when received index is last index', () => {
            expect(getNextElement([0, 1, 2, 3, 4], 4, true)).toBe(0);
        });

        test('returns undefined when array is empty', () => {
            expect(getNextElement([], 1)).toBe(undefined);
        });
    });

    describe('getPreviousElement', () => {
        test('returns previous element in array', () => {
            expect(getPreviousElement([0, 1, 2, 3, 4], 3)).toBe(2);
        });

        test('returns last element in array when received index is first index', () => {
            expect(getPreviousElement([0, 1, 2, 3, 4], 0, true)).toBe(4);
        });

        test('returns undefined when array is empty', () => {
            expect(getPreviousElement([], 1)).toBe(undefined);
        });
    });

    describe('unique', () => {
        test('returns unique values', () => {
            const input = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
            const expected = [0, 1, 2, 3, 4];

            expect(unique(input)).toEqual(expected);
        });
    });
});
