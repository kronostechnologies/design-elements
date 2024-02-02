import {
    findFirstElement,
    findLastElement,
    findNextElement,
    findPreviousElement,
    getFirstElement,
    getLastElement,
    getNextElement,
    getPreviousElement,
    unique,
} from './array';

describe('array utilities', () => {
    describe('getFirstElement', () => {
        test('returns first element in array', () => {
            expect(getFirstElement([0, 1, 2, 3, 4])).toBe(0);
        });

        test('returns undefined when array is empty', () => {
            expect(getFirstElement([])).toBe(undefined);
        });
    });

    describe('findFirstElement', () => {
        test('returns first element in array matching the predicate', () => {
            expect(findFirstElement([0, 1, 2, 3, 4], (a) => a > 1)).toBe(2);
        });

        test('returns undefined when array is empty', () => {
            expect(findFirstElement([], (a) => a > 1)).toBe(undefined);
        });

        test('returns undefined when predicate does not match any element', () => {
            expect(findFirstElement([0, 1, 2, 3, 4], (a) => a > 10)).toBe(undefined);
        });
    });

    describe('getLastElement', () => {
        test('returns last element in array', () => {
            expect(getLastElement([0, 1, 2, 3, 4])).toBe(4);
        });

        test('returns undefined when array is empty', () => {
            expect(getLastElement([])).toBe(undefined);
        });
    });

    describe('findLastElement', () => {
        test('returns last element in array matching the predicate', () => {
            expect(findLastElement([0, 1, 2, 3, 4], (a) => a > 1)).toBe(4);
        });

        test('returns undefined when array is empty', () => {
            expect(findLastElement([], (a) => a > 1)).toBe(undefined);
        });

        test('returns undefined when predicate does not match any element', () => {
            expect(findLastElement([0, 1, 2, 3, 4], (a) => a > 10)).toBe(undefined);
        });
    });

    describe('getNextElement', () => {
        test('returns next element in array', () => {
            expect(getNextElement([0, 1, 2, 3, 4], 1)).toBe(2);
        });

        test('returns undefined when array is empty', () => {
            expect(getNextElement([], 1)).toBe(undefined);
        });

        test('returns undefined when current index is on the last element', () => {
            expect(getNextElement([0, 1, 2, 3, 4], 4)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            test('returns first element when current index is on the last element', () => {
                expect(getNextElement([0, 1, 2, 3, 4], 4, { wrapAround: true })).toBe(0);
            });
        });
    });

    describe('findNextElement', () => {
        test('returns next element in array matching the predicate', () => {
            expect(findNextElement([0, 1, 2, 3, 4], 1, (a) => a > 2)).toBe(3);
        });

        test('returns undefined when array is empty', () => {
            expect(findNextElement([], 1, (a) => a > 2)).toBe(undefined);
        });

        test('returns undefined when current index is on the last element', () => {
            expect(findNextElement([0, 1, 2, 3, 4], 4, (a) => a > 2)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            test('returns first matching element when current index is on the last element', () => {
                expect(findNextElement([0, 1, 2, 3, 4], 4, (a) => a > 2, { wrapAround: true })).toBe(3);
            });
        });
    });

    describe('getPreviousElement', () => {
        test('returns previous element in array', () => {
            expect(getPreviousElement([0, 1, 2, 3, 4], 2)).toBe(1);
        });

        test('returns undefined when array is empty', () => {
            expect(getPreviousElement([], 2)).toBe(undefined);
        });

        test('returns undefined when current index is on the first element', () => {
            expect(getPreviousElement([0, 1, 2, 3, 4], 0)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            test('returns last element when current index is on the first element', () => {
                expect(getPreviousElement([0, 1, 2, 3, 4], 0, { wrapAround: true })).toBe(4);
            });
        });
    });

    describe('findPreviousElement', () => {
        test('returns previous element in array matching the predicate', () => {
            expect(findPreviousElement([0, 1, 2, 3, 4], 3, (a) => a < 2)).toBe(1);
        });

        test('returns undefined when array is empty', () => {
            expect(findPreviousElement([], 1, (a) => a < 2)).toBe(undefined);
        });

        test('returns undefined when current index is on the first element', () => {
            expect(findPreviousElement([0, 1, 2, 3, 4], 0, (a) => a < 2)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            test('returns first matching element when current index is on the first element', () => {
                expect(findPreviousElement([0, 1, 2, 3, 4], 0, (a) => a < 4, { wrapAround: true })).toBe(3);
            });
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
