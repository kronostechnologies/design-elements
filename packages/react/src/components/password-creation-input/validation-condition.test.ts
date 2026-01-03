import { hasALowerCaseLetter, hasAnUpperCaseLetter, hasMinLength } from './validation-condition';

describe('hasMinLength', () => {
    it('should return false if length is smaller then min length', () => {
        expect(hasMinLength(8)('1234567')).toBe(false);
    });

    it('should return true if length is equal to min length', () => {
        expect(hasMinLength(8)('12345678')).toBe(true);
    });

    it('should return true if length is greather then min length', () => {
        expect(hasMinLength(8)('123456789')).toBe(true);
    });
});

describe('hasAnUpperCaseLetter', () => {
    it('should return true if string has an uppercase letter', () => {
        expect(hasAnUpperCaseLetter('aA')).toBe(true);
    });

    it('should return fales if string has no uppercase letter', () => {
        expect(hasMinLength(8)('aa')).toBe(false);
    });
});

describe('hasALowerCaseLetter', () => {
    it('should return true if string has a lowercase letter', () => {
        expect(hasALowerCaseLetter('aA')).toBe(true);
    });

    it('should return fales if string has no lowercase letter', () => {
        expect(hasALowerCaseLetter('AA')).toBe(false);
    });
});
