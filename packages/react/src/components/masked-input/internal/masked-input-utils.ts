import type { MaskitoOptions } from '@maskito/core';
import { maskitoTransform } from '@maskito/core';

export function formatValue(value: string, maskitoOptions: MaskitoOptions): string {
    return maskitoTransform(value, maskitoOptions);
}

export function extractRawInput(value: string, separatorSet: Set<string>): string {
    return Array.from(value).filter((char) => !separatorSet.has(char)).join('');
}
