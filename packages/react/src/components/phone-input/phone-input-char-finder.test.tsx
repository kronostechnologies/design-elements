import {
    findNextInsertPositionFromPatternInputDiff,
    getDecimalCharCount,
    getNextPlaceholderIndex,
    getPreviousPlaceholderIndex,
    hasAnyDecimalChar,
} from './phone-input-char-finder';

describe('Phone Input Value Finder', () => {
    describe('getDecimalCharAmount', () => {
        it('should get null given a string without decimal', () => {
            const decimalCharAmount = getDecimalCharCount('abc');

            expect(decimalCharAmount).toBe(0);
        });

        it('should get string length given a string with only decimals', () => {
            const decimalCharAmount = getDecimalCharCount('123');

            expect(decimalCharAmount).toBe(3);
        });

        it('should get 2 given a string with 2 decimals', () => {
            const decimalCharAmount = getDecimalCharCount('a1b2');

            expect(decimalCharAmount).toBe(2);
        });
    });

    describe('hasAnyDecimalChar', () => {
        it('should not have any decimal char given a string without decimal char', () => {
            const hasAnyDecimal = hasAnyDecimalChar('abc');

            expect(hasAnyDecimal).toBe(false);
        });

        it('should have decimals chars given a string with only decimals chars', () => {
            const hasAnyDecimal = hasAnyDecimalChar('123');

            expect(hasAnyDecimal).toBe(true);
        });

        it('should have decimals chars given a string with both decimals chars and non-decimals chars', () => {
            const hasAnyDecimal = hasAnyDecimalChar('a1b2');

            expect(hasAnyDecimal).toBe(true);
        });
    });

    describe('getNextPlaceHolderIndex', () => {
        it('should return provided position when it is positioned on placeholder char', () => {
            const index = getNextPlaceholderIndex('(XXX) XXX-XXXX', 1, 'X');

            expect(index).toBe(1);
        });

        it('should return next placeholder char index from position', () => {
            const index = getNextPlaceholderIndex('(XXX) XXX-XXXX', 4, 'X');

            expect(index).toBe(6);
        });

        it('should return -1 when next placeholder char can\'t be found', () => {
            const index = getNextPlaceholderIndex('(XXX)', 4, 'X');

            expect(index).toBe(-1);
        });

        it('should return -1 when next placeholder char cant be found', () => {
            const index = getNextPlaceholderIndex('(XXX)', 4, 'X');

            expect(index).toBe(-1);
        });

        it('should return -1 when provided position is out of pattern range', () => {
            const index = getNextPlaceholderIndex('(XXX)', 6, 'X');

            expect(index).toBe(-1);
        });

        it('should return -1 when provided position is negative', () => {
            const index = getNextPlaceholderIndex('(XXX)', -2, 'X');

            expect(index).toBe(-1);
        });
    });

    describe('getPreviousPlaceHolderIndex', () => {
        it('should return -1 when previous placeholder char cant be found', () => {
            const index = getPreviousPlaceholderIndex('(XXX)', 0, 'X');

            expect(index).toBe(-1);
        });

        it('should return previous placeholder char index from position', () => {
            const index = getPreviousPlaceholderIndex('(XXX)', 2, 'X');

            expect(index).toBe(1);
        });

        it('should return the last placeholder char index in pattern given a position outside pattern range', () => {
            const index = getPreviousPlaceholderIndex('(XXX)', 6, 'X');

            expect(index).toBe(3);
        });

        it('should return -1 when providing a negative position', () => {
            const index = getPreviousPlaceholderIndex('(XXX)', -1, 'X');

            expect(index).toBe(-1);
        });
    });

    describe('findNextInsertPositionFromPatternInputDiff', () => {
        it('should return -1 when input value is not different from pattern', () => {
            const index = findNextInsertPositionFromPatternInputDiff('(XXX)', '(123)', 'X');

            expect(index).toBe(-1);
        });

        it('should return index following char that break pattern after format', () => {
            const index = findNextInsertPositionFromPatternInputDiff('1234)', '(XXX)', 'X');

            expect(index).toBe(2);
        });

        it('should return -1 when no placeholder char is following char that break pattern after format', () => {
            const index = findNextInsertPositionFromPatternInputDiff('(1234', '(XXX) (', 'X');

            expect(index).toBe(-1);
        });
    });
});
