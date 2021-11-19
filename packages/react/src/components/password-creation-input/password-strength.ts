import { TFunction } from "i18next";
import { hasALowerCaseLetter, hasAnUpperCaseLetter, isLongEnough } from "./validation-condition";

export enum PasswordStrengthEnum {
    None = 0,
    Weak = 1,
    Fair = 2,
    Good = 3,
    Strong = 4,
}

interface PasswordStrength {
    label: string;
    strength: PasswordStrengthEnum;
}

export function getPasswordStrength(password: string, t: TFunction): PasswordStrength {
    const passwordLongEnough = isLongEnough(8)(password);
    const passwordHasUpperCaseLetter = hasAnUpperCaseLetter(password);
    const passwordHasLowerCaseLetter = hasALowerCaseLetter(password);
    let label = '';
    let strength = PasswordStrengthEnum.None;

    if (password) {
        label = t('password-is') + t('weak');
        strength = PasswordStrengthEnum.Weak;
    }

    if (passwordLongEnough && (passwordHasUpperCaseLetter || passwordHasLowerCaseLetter)) {
        label = t('password-is') + t('fair');
        strength = PasswordStrengthEnum.Fair;
    }

    if (passwordLongEnough && passwordHasUpperCaseLetter && passwordHasLowerCaseLetter) {
        label = t('password-is') + t('good');
        strength = PasswordStrengthEnum.Good;

        if (password.length >= 12) {
            label = t('password-is') + t('strong');
            strength = PasswordStrengthEnum.Strong;
        }
    }

    return {
        label,
        strength,
    };
}
