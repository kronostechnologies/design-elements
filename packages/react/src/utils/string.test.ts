import { allSameLetter } from './string';

describe('string', () => {
    describe('allSameLetter', () => {
        test('should return true when all letters are the same', () => {
            expect(allSameLetter('aaaa')).toBe(true);
        });

        test('should return false when not all letters are the same', () => {
            expect(allSameLetter('aaab')).toBe(false);
        });
    });
});
