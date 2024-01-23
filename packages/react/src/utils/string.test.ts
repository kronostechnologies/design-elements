import { allSameLetter, stripDiacritics } from './string';

describe('string utilities', () => {
    describe('allSameLetter', () => {
        test('should return true when all letters are the same', () => {
            expect(allSameLetter('aaaa')).toBe(true);
        });

        test('should return false when not all letters are the same', () => {
            expect(allSameLetter('aaab')).toBe(false);
        });
    });

    describe('stripDiacritics', () => {
        test('should replace accented characters with non-accented equivalents', () => {
            expect(stripDiacritics('Où il est le Père Noël, déjà?')).toBe('Ou il est le Pere Noel, deja?');
        });
    });
});
