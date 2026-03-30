import type { MaskitoPostprocessor, MaskitoPreprocessor } from '@maskito/core';

export type MaskPreprocessor = MaskitoPreprocessor;
export type MaskPostprocessor = MaskitoPostprocessor;

export function toUpperCase(): MaskPreprocessor {
    return ({ elementState, data }, actionType) => {
        if (actionType === 'insert') {
            return { elementState, data: data.toLocaleUpperCase() };
        }
        return { elementState, data };
    };
}

export function addTrailingFixedCharsPostprocessor(mask: Array<RegExp | string>): MaskPostprocessor {
    return (elementState, initialElementState) => {
        const { value, selection } = elementState;
        let caretPos = selection[1];
        let newValue = value;
        const isInsert = selection[1] > initialElementState.selection[0];
        const isDeletion = !isInsert;

        if (isDeletion || caretPos !== value.length || selection[0] !== selection[1]) {
            return elementState;
        }

        while (caretPos < mask.length && typeof mask[caretPos] === 'string') {
            newValue = newValue.slice(0, caretPos) + mask[caretPos] + newValue.slice(caretPos);
            caretPos += 1;
        }

        return { value: newValue, selection: [caretPos, caretPos] };
    };
}
