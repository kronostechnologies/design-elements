import { TFunction } from 'i18next';

export interface ValidationCondition {
    label: string;
    isValid(password: string): boolean;
}

export const isLongEnough = (minLength = 8) => (password: string): boolean => password.length >= minLength;
export const hasAnUpperCaseLetter = (password: string): boolean => password.toLowerCase() !== password;
export const hasALowerCaseLetter = (password: string): boolean => password.toUpperCase() !== password;

export function getDefaultValidationConditions(t: TFunction): ValidationCondition[] {
    return [
        {
            label: t('min-8-characters'),
            isValid: isLongEnough(8),
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
