export function buildSlotMap(mask: string, separators: string): boolean[] {
    const separatorSet = new Set(separators);
    return Array.from(mask, (char) => !separatorSet.has(char));
}

export function isSlotPosition(slots: boolean[], index: number): boolean {
    return index >= 0 && index < slots.length && slots[index];
}

export function getSlotCount(slots: boolean[]): number {
    return slots.filter(Boolean).length;
}

export function getNextSlotIndex(slots: boolean[], position: number): number {
    for (let i = position; i < slots.length; i++) {
        if (slots[i]) {
            return i;
        }
    }
    return -1;
}

export function getPreviousSlotIndex(slots: boolean[], position: number): number {
    for (let i = position - 1; i >= 0; i--) {
        if (slots[i]) {
            return i;
        }
    }
    return -1;
}

export function hasUserInput(formattedValue: string, slots: boolean[], mask: string): boolean {
    return slots.some((isSlot, i) => isSlot && i < formattedValue.length && formattedValue[i] !== mask[i]);
}

export function getUserInputCharCount(value: string, slots: boolean[], mask: string): number {
    let count = 0;
    for (let i = 0; i < value.length && i < slots.length; i++) {
        if (slots[i] && value[i] !== mask[i]) {
            count += 1;
        }
    }
    return count;
}

export function isValidInputChar(char: string, separators: Set<string>): boolean {
    return !separators.has(char);
}

export function findNextInsertPositionFromMaskInputDiff(
    inputValue: string,
    slots: boolean[],
    separators: Set<string>,
): number {
    for (let i = 0; i < inputValue.length; i++) {
        if (!slots[i] && isValidInputChar(inputValue[i], separators)) {
            const nextSlot = getNextSlotIndex(slots, i);
            return nextSlot >= 0 ? nextSlot + 1 : nextSlot;
        }
    }
    return -1;
}
