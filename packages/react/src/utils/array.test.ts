import { getNextElementInArray, getPreviousElementInArray } from './array';

describe('array', () => {
    describe('getNextElementInArray', () => {
        it('should return next element in array', () => {
            expect(getNextElementInArray([0, 1, 2, 3, 4], 3)).toBe(4);
        });

        it('should return first element in array when received index is last index', () => {
            expect(getNextElementInArray([0, 1, 2, 3, 4], 4)).toBe(0);
        });

        it('should return undefined when array is empty', () => {
            expect(getNextElementInArray([], 1)).toBe(undefined);
        });
    });

    describe('getPreviousElementInArray', () => {
        it('should return previous element in array', () => {
            expect(getPreviousElementInArray([0, 1, 2, 3, 4], 3)).toBe(2);
        });

        it('should return last element in array when received index is first index', () => {
            expect(getPreviousElementInArray([0, 1, 2, 3, 4], 0)).toBe(4);
        });

        it('should return undefined when array is empty', () => {
            expect(getPreviousElementInArray([], 1)).toBe(undefined);
        });
    });
});
