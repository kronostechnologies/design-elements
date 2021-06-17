import { isLetterOrNumber } from './regex';

describe('regex', () => {
    describe('isLetterOrNumber', () => {
        it('should return true when string is a letter', () => {
            const letter = 'a';

            expect(isLetterOrNumber(letter)).toBe(true);
        });

        it('should return true when string is a number', () => {
            const number = '1';

            expect(isLetterOrNumber(number)).toBe(true);
        });

        it('should return false when string is not a number or a letter', () => {
            const specialCharacter = '!';

            expect(isLetterOrNumber(specialCharacter)).toBe(false);
        });
    });
});
