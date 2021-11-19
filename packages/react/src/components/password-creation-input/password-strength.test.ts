import { getPasswordStrength } from './password-strength';
import { PasswordStrengthEnum } from './password-strength.enum';

describe('password strength', () => {
    it('should return NONE when password is empty', () => {
        expect(getPasswordStrength('')).toBe(PasswordStrengthEnum.NONE);
    });

    it('should return WEAK when password is not empty', () => {
        expect(getPasswordStrength('.')).toBe(PasswordStrengthEnum.WEAK);
    });

    it('should return FAIR when password is long enough', () => {
        expect(getPasswordStrength('p2345678')).toBe(PasswordStrengthEnum.FAIR);
    });

    it('should return GOOD when password is long enough and has an uppercase and a lowercase letter', () => {
        expect(getPasswordStrength('aA12345678')).toBe(PasswordStrengthEnum.GOOD);
    });

    it('should return STRONG when password has at least 12 characters, including uppercase/lowercase letters', () => {
        expect(getPasswordStrength('aAbB12345678')).toBe(PasswordStrengthEnum.STRONG);
    });
});
