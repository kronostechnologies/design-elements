import { allSameLetter, replaceRange, stripDiacritics } from './string';

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

    describe('replaceRange', () => {
        test('should replace the specified range with the replacement string', () => {
            const result = replaceRange('hello world', 6, 11, 'universe');

            expect(result).toBe('hello universe');
        });

        test('should replace the entire string when start is 0 and end is the length of the string', () => {
            const result = replaceRange('hello', 0, 5, 'hi');

            expect(result).toBe('hi');
        });

        test('should insert the replacement string when start and end are the same', () => {
            const result = replaceRange('hello', 2, 2, 'y');

            expect(result).toBe('heyllo');
        });

        test('should throw an error when start is greater than end', () => {
            expect(() => replaceRange('hello', 3, 2, 'y')).toThrow('Invalid index range');
        });

        test('should throw an error when start or end is out of bounds', () => {
            expect(() => replaceRange('hello', -1, 2, 'y')).toThrow('Invalid index range');
            expect(() => replaceRange('hello', 2, 6, 'y')).toThrow('Invalid index range');
        });
    });
});
