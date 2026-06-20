import type { FilterDateRangePreset, FilterDateRangeValue } from '../../filter-date-range';
import type { ComputedPreset } from './presets';

function isSameDay(date1: Date | null, date2: Date | null): boolean {
    if (date1 === null && date2 === null) {
        return true;
    }
    if (date1 === null || date2 === null) {
        return false;
    }
    return (
        date1.getFullYear() === date2.getFullYear()
        && date1.getMonth() === date2.getMonth()
        && date1.getDate() === date2.getDate()
    );
}

export function hasSameRange(range1: FilterDateRangeValue, range2: FilterDateRangeValue): boolean {
    return isSameDay(range1.from, range2.from) && isSameDay(range1.to, range2.to);
}

export function getRangeFromPreset(preset: ComputedPreset | FilterDateRangePreset | null): FilterDateRangeValue {
    if (!preset) {
        return { from: null, to: null };
    }

    let from: Date | null = null;
    let to: Date | null = null;
    if ('start' in preset && preset.start) {
        from = preset.start;
    }
    if ('end' in preset && preset.end) {
        to = preset.end;
    }

    return { from, to };
}

export function isSameDateTime(date1: Date | null, date2: Date | null): boolean {
    if (date1 === null || date2 === null) {
        return date1 === date2;
    }

    return date1.getTime() === date2.getTime();
}
