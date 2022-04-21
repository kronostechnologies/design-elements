import { hasMinLength, hasALowerCaseLetter, hasAnUpperCaseLetter } from './validation-condition';

describe('hasMinLength', () => {
    test('should return false if length is smaller then min length', () => {
        expect(hasMinLength(8)('1234567')).toBe(false);
    });

    test('should return true if length is equal to min length', () => {
        expect(hasMinLength(8)('12345678')).toBe(true);
    });

    test('should return true if length is greather then min length', () => {
        expect(hasMinLength(8)('123456789')).toBe(true);
    });
});

describe('hasAnUpperCaseLetter', () => {
    test('should return true if string has an uppercase letter', () => {
        expect(hasAnUpperCaseLetter('aA')).toBe(true);
    });

    test('should return fales if string has no uppercase letter', () => {
        expect(hasMinLength(8)('aa')).toBe(false);
    });
});

describe('hasALowerCaseLetter', () => {
    test('should return true if string has a lowercase letter', () => {
        expect(hasALowerCaseLetter('aA')).toBe(true);
    });

    test('should return fales if string has no lowercase letter', () => {
        expect(hasALowerCaseLetter('AA')).toBe(false);
    });
});
