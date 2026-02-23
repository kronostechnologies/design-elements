import { hasUserInput, isSlotPosition } from './masked-input-char-finder';

export function getFirstUnfilledSlotIndex(formattedValue: string, slots: boolean[], mask: string): number {
    for (let i = 0; i < slots.length; i++) {
        if (isSlotPosition(slots, i) && formattedValue[i] === mask[i]) {
            return i;
        }
    }
    return -1;
}

export function getValueFromSplitIndex(
    formattedValue: string,
    indexOfFirstUnfilledSlot: number,
    slots: boolean[],
    mask: string,
): string {
    if (!hasUserInput(formattedValue, slots, mask)) {
        return '';
    }
    if (indexOfFirstUnfilledSlot === -1) {
        return formattedValue;
    }
    return formattedValue.slice(0, indexOfFirstUnfilledSlot);
}

export function trimCharAfterMaxLength(value: string, maxLength: number): string {
    return value.substring(0, maxLength);
}
