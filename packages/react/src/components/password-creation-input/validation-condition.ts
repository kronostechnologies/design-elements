import { TFunction } from 'i18next';

export interface ValidationCondition {
    label: string;
    isValid(password: string): boolean;
}

export function hasMinLength(minLength = 8) {
    return (password: string): boolean => password.length >= minLength;
}

export function hasAnUpperCaseLetter(password: string): boolean {
    return password.toLowerCase() !== password;
}

export function hasALowerCaseLetter(password: string): boolean {
    return password.toUpperCase() !== password;
}

export function getDefaultValidationConditions(t: TFunction): ValidationCondition[] {
    return [
        {
            label: t('min-8-characters'),
            isValid: hasMinLength(8),
        },
        {
            label: t('min-1-upper-case'),
            isValid: hasAnUpperCaseLetter,
        },
        {
            label: t('min-1-lower-case'),
            isValid: hasALowerCaseLetter,
        },
    ];
}
