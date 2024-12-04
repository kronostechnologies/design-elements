import { allSameLetter, joinStrings, stripDiacritics } from './string';

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

    describe('joinStrings', () => {
        it('joins multiple strings with a space', () => {
            expect(joinStrings('a', 'b', 'c')).toEqual('a b c');
        });

        it('ignores undefined values', () => {
            expect(joinStrings('a', undefined, 'c')).toEqual('a c');
        });

        it('returns undefined when all values are undefined', () => {
            expect(joinStrings(undefined, undefined, undefined)).toBeUndefined();
        });
    });
});
