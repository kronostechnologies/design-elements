import {
    findFirstElement,
    findLastElement,
    findNextElement,
    findPreviousElement,
    getFirstElement,
    getLastElement,
    getNextElement,
    getPreviousElement,
    includes,
    unique,
} from './array';

describe('array utilities', () => {
    describe('getFirstElement', () => {
        it('returns first element in array', () => {
            expect(getFirstElement([0, 1, 2, 3, 4])).toBe(0);
        });

        it('returns undefined when array is empty', () => {
            expect(getFirstElement([])).toBe(undefined);
        });
    });

    describe('findFirstElement', () => {
        it('returns first element in array matching the predicate', () => {
            expect(findFirstElement([0, 1, 2, 3, 4], (a) => a > 1)).toBe(2);
        });

        it('returns undefined when array is empty', () => {
            expect(findFirstElement([], (a) => a > 1)).toBe(undefined);
        });

        it('returns undefined when predicate does not match any element', () => {
            expect(findFirstElement([0, 1, 2, 3, 4], (a) => a > 10)).toBe(undefined);
        });
    });

    describe('getLastElement', () => {
        it('returns last element in array', () => {
            expect(getLastElement([0, 1, 2, 3, 4])).toBe(4);
        });

        it('returns undefined when array is empty', () => {
            expect(getLastElement([])).toBe(undefined);
        });
    });

    describe('findLastElement', () => {
        it('returns last element in array matching the predicate', () => {
            expect(findLastElement([0, 1, 2, 3, 4], (a) => a > 1)).toBe(4);
        });

        it('returns undefined when array is empty', () => {
            expect(findLastElement([], (a) => a > 1)).toBe(undefined);
        });

        it('returns undefined when predicate does not match any element', () => {
            expect(findLastElement([0, 1, 2, 3, 4], (a) => a > 10)).toBe(undefined);
        });
    });

    describe('getNextElement', () => {
        it('returns next element in array', () => {
            expect(getNextElement([0, 1, 2, 3, 4], 1)).toBe(2);
        });

        it('returns undefined when array is empty', () => {
            expect(getNextElement([], 1)).toBe(undefined);
        });

        it('returns undefined when current index is on the last element', () => {
            expect(getNextElement([0, 1, 2, 3, 4], 4)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            it('returns first element when current index is on the last element', () => {
                expect(getNextElement([0, 1, 2, 3, 4], 4, { wrapAround: true })).toBe(0);
            });
        });
    });

    describe('findNextElement', () => {
        it('returns next element in array matching the predicate', () => {
            expect(findNextElement([0, 1, 2, 3, 4], 1, (a) => a > 2)).toBe(3);
        });

        it('returns undefined when array is empty', () => {
            expect(findNextElement([], 1, (a) => a > 2)).toBe(undefined);
        });

        it('returns undefined when current index is on the last element', () => {
            expect(findNextElement([0, 1, 2, 3, 4], 4, (a) => a > 2)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            it('returns first matching element when current index is on the last element', () => {
                expect(findNextElement([0, 1, 2, 3, 4], 4, (a) => a > 2, { wrapAround: true })).toBe(3);
            });
        });
    });

    describe('getPreviousElement', () => {
        it('returns previous element in array', () => {
            expect(getPreviousElement([0, 1, 2, 3, 4], 2)).toBe(1);
        });

        it('returns undefined when array is empty', () => {
            expect(getPreviousElement([], 2)).toBe(undefined);
        });

        it('returns undefined when current index is on the first element', () => {
            expect(getPreviousElement([0, 1, 2, 3, 4], 0)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            it('returns last element when current index is on the first element', () => {
                expect(getPreviousElement([0, 1, 2, 3, 4], 0, { wrapAround: true })).toBe(4);
            });
        });
    });

    describe('findPreviousElement', () => {
        it('returns previous element in array matching the predicate', () => {
            expect(findPreviousElement([0, 1, 2, 3, 4], 3, (a) => a < 2)).toBe(1);
        });

        it('returns undefined when array is empty', () => {
            expect(findPreviousElement([], 1, (a) => a < 2)).toBe(undefined);
        });

        it('returns undefined when current index is on the first element', () => {
            expect(findPreviousElement([0, 1, 2, 3, 4], 0, (a) => a < 2)).toBe(undefined);
        });

        describe('with wrapAround', () => {
            it('returns first matching element when current index is on the first element', () => {
                expect(findPreviousElement([0, 1, 2, 3, 4], 0, (a) => a < 4, { wrapAround: true })).toBe(3);
            });
        });
    });

    describe('unique', () => {
        it('returns unique values', () => {
            const input = [0, 1, 2, 3, 4, 0, 1, 2, 3, 4];
            const expected = [0, 1, 2, 3, 4];

            expect(unique(input)).toEqual(expected);
        });

        it('returns unique values with custom predicate', () => {
            const input = [
                { value: 1, name: 'one' },
                { value: 2, name: 'two' },
                { value: 1, name: '1' },
            ];

            const uniqueValues = unique(input, (a, b) => a.value === b.value);

            expect(uniqueValues).toEqual([{ value: 1, name: 'one' }, { value: 2, name: 'two' }]);
        });
    });

    describe('includes', () => {
        it('returns true if the array includes the value', () => {
            const isIncludes = includes([1, 2, 3], 2);

            expect(isIncludes).toBe(true);
        });

        it('returns false if the array does not include the value', () => {
            const isIncludes = includes([1, 2, 3], 4);

            expect(isIncludes).toBe(false);
        });

        it('returns true if the array includes the value with custom predicate', () => {
            const input = [
                { value: 1, name: 'one' },
                { value: 2, name: 'two' },
                { value: 3, name: 'three' },
            ];

            const isIncludes = includes(input, { value: 2, name: 'two' }, (a, b) => a.value === b.value);

            expect(isIncludes).toBe(true);
        });
    });
});
