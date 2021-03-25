import { hasAnyDecimalChar } from './phone-input-char-finder';

export function getValueFromSplitIndex(formattedValue: string, indexOfFirstMaskCharInValue: number): string {
    let value;
    if (!hasAnyDecimalChar(formattedValue)) {
        value = '';
    } else if (indexOfFirstMaskCharInValue === -1) {
        value = formattedValue;
    } else {
        value = formattedValue.slice(0, indexOfFirstMaskCharInValue);
    }

    return value;
}

export function getMaskFromSplitIndex(
    formattedValue: string,
    indexOfFirstMaskCharInValue: number,
    pattern: string,
): string {
    let mask;
    if (!hasAnyDecimalChar(formattedValue)) {
        mask = pattern;
    } else if (indexOfFirstMaskCharInValue === -1) {
        mask = '';
    } else {
        mask = formattedValue.slice(indexOfFirstMaskCharInValue);
    }

    return mask;
}

export function trimCharAfterMaxLength(value: string, phoneNumberMaxLength: number): string {
    return value.substr(0, phoneNumberMaxLength);
}
