import { PasswordStrengthEnum } from './password-strength.enum';
import { hasALowerCaseLetter, hasAnUpperCaseLetter, hasMinLength } from './validation-condition';

export function getPasswordStrength(password: string): PasswordStrengthEnum {
    const passwordLongEnough = hasMinLength(8)(password);
    const passwordHasUpperCaseLetter = hasAnUpperCaseLetter(password);
    const passwordHasLowerCaseLetter = hasALowerCaseLetter(password);
    let strength = PasswordStrengthEnum.NONE;

    if (password) {
        strength = PasswordStrengthEnum.WEAK;
    }

    if (passwordLongEnough && (passwordHasUpperCaseLetter || passwordHasLowerCaseLetter)) {
        strength = PasswordStrengthEnum.FAIR;
    }

    if (passwordLongEnough && passwordHasUpperCaseLetter && passwordHasLowerCaseLetter) {
        strength = PasswordStrengthEnum.GOOD;

        if (password.length >= 12) {
            strength = PasswordStrengthEnum.STRONG;
        }
    }

    return strength;
}
