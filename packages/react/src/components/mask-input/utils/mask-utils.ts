export function isCharacterAllowed(char: string, patternChar: string): boolean {
    switch (patternChar) {
        case 'A':
            return /^[A-Za-z]$/.test(char);
        case '1':
            return /^[0-9]$/.test(char);
        case '_':
            return /^[A-Za-z0-9]$/.test(char);
        default:
            return false;
    }
}

export function isEditablePosition(position: number, mask: string): boolean {
    return mask[position] === 'A' || mask[position] === '1' || mask[position] === '_';
}

export function getNextEditablePosition(
    mask: string,
    currentPos: number,
    direction: 'forward' | 'backward' = 'forward',
): number {
    const increment = direction === 'forward' ? 1 : -1;
    let pos = currentPos;
    while (pos >= 0 && pos < mask.length) {
        if (isEditablePosition(pos, mask)) {
            return pos;
        }
        pos += increment;
    }
    return currentPos;
}

function isAlreadyFormatted(value: string, mask: string): boolean {
    if (value.length !== mask.length) return false;

    for (let i = 0; i < mask.length; i++) {
        if (mask[i] !== 'A' && mask[i] !== '1' && mask[i] !== '_') {
            if (value[i] !== mask[i]) return false;
        } else if (mask[i] === 'A') {
            if (!/^[A-Za-z]$/.test(value[i]) && value[i] !== '_') return false;
        } else if (mask[i] === '1') {
            if (!/^[0-9]$/.test(value[i]) && value[i] !== '_') return false;
        }
    }

    return true;
}

function formatDefaultValueToMask(rawValue: string, mask: string): string {
    let formattedValue = mask;
    let valueIndex = 0;

    for (let i = 0; i < mask.length; i++) {
        if (valueIndex >= rawValue.length) break;

        if (mask[i] === 'A' || mask[i] === '1' || mask[i] === '_') {
            const charToInsert = rawValue[valueIndex];
            if (isCharacterAllowed(charToInsert, mask[i])) {
                formattedValue = formattedValue.substring(0, i)
                    + charToInsert
                    + formattedValue.substring(i + 1);
                valueIndex += 1;
            } else {
                valueIndex += 1;
                i -= 1;
            }
        }
    }

    return formattedValue;
}

export function extractValidChars(value: string, mask: string): string {
    if (!value) return '';

    let validChars = '';
    let patternIndex = 0;

    for (let i = 0; i < value.length; i++) {
        const char = value[i];

        // Find next editable position in pattern
        while (patternIndex < mask.length && !isEditablePosition(patternIndex, mask)) {
            patternIndex += 1;
        }

        if (patternIndex >= mask.length) break;

        // Check if character matches pattern requirement at this position
        if (isCharacterAllowed(char, mask[patternIndex])) {
            validChars += char;
            patternIndex += 1;
        }
    }

    return validChars;
}

export function getDefaultValueFormatted(defaultValue: string, mask: string): string {
    if (isAlreadyFormatted(defaultValue, mask)) {
        return defaultValue;
    }
    const validChars = extractValidChars(defaultValue, mask);
    return formatDefaultValueToMask(validChars, mask);
}

export function removeSelectedCharacters(
    displayValue: string,
    selectionStart: number,
    selectionEnd: number,
    mask: string,
): string {
    let newValue = displayValue;
    for (let i = selectionStart; i < selectionEnd; i++) {
        if (isEditablePosition(i, mask)) {
            newValue = `${newValue.substring(0, i)}_${newValue.substring(i + 1)}`;
        }
    }
    return newValue;
}

export function applyNewCharacter(displayValue: string, newChar: string, editPosition: number): string {
    return displayValue.substring(0, editPosition) + newChar + displayValue.substring(editPosition + 1);
}

export function extractRawValue(displayValue: string, mask: string): string {
    let extracted = '';

    for (let i = 0; i < displayValue.length; i++) {
        if (isEditablePosition(i, mask) && displayValue[i] !== '_') {
            extracted += displayValue[i];
        }
    }
    return extracted;
}

export function getFormattedPastedValue(
    cursorPosition: number,
    selectionEnd: number,
    displayValue: string,
    validChars: string,
    mask: string,
): string {
    // If we already have a value, combine it with the pasted value
    let combinedRawValue: string;

    // If there's a selection, replace the selected portion
    if (cursorPosition !== selectionEnd) {
        // Remove the selected portion from the raw value
        const beforeSelection = extractRawValue(displayValue.substring(0, cursorPosition), mask);
        const afterSelection = extractRawValue(displayValue.substring(selectionEnd), mask);
        combinedRawValue = beforeSelection + validChars + afterSelection;
    } else {
        // Otherwise, insert at cursor position
        const beforeCursor = extractRawValue(displayValue.substring(0, cursorPosition), mask);
        const afterCursor = extractRawValue(displayValue.substring(cursorPosition), mask);
        combinedRawValue = beforeCursor + validChars + afterCursor;
    }

    return getDefaultValueFormatted(combinedRawValue, mask);
}

// Helper function to determine cursor position after paste
export function getPositionAfterPaste(
    cursorPos: number,
    pastedLength: number,
    newValue: string,
    displayValue: string,
    mask: string,
): number {
    // Count how many actual characters are in the display up to the cursor
    let charCount = 0;
    for (let i = 0; i < cursorPos; i++) {
        if (isEditablePosition(i, mask) && displayValue[i] !== '_') {
            charCount += 1;
        }
    }

    // Find the position after pasting charCount + pastedLength characters
    let targetPos = 0;
    let foundChars = 0;

    for (let i = 0; i < newValue.length; i++) {
        if (isEditablePosition(i, mask)) {
            if (newValue[i] !== '_') {
                foundChars += 1;
            }
            if (foundChars > charCount + pastedLength) {
                break;
            }
        }
        targetPos = i;
    }

    // Return the next editable position
    return getNextEditablePosition(mask, targetPos, 'forward');
}

export function extractRawValueFromSelection(
    displayValue: string,
    cursorPosition: number,
    selectionEnd: number,
    mask: string,
): string {
    let selectedText = '';
    for (let i = cursorPosition; i < selectionEnd; i++) {
        if (isEditablePosition(i, mask) && displayValue[i] !== '_') {
            selectedText += displayValue[i];
        }
    }
    return selectedText;
}

export function clearSelectionInDisplayValue(
    displayValue: string,
    cursorPosition: number,
    selectionEnd: number,
    mask: string,
): string {
    let newValue = displayValue;
    for (let i = cursorPosition; i < selectionEnd; i++) {
        if (isEditablePosition(i, mask)) {
            newValue = `${newValue.substring(0, i)}_${newValue.substring(i + 1)}`;
        }
    }
    return newValue;
}
