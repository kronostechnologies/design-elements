import {
    add,
    addYears,
    endOfDay,
    endOfYear,
    isSameDay,
    isSameYear,
    isToday,
    isTomorrow,
    isYesterday,
    startOfDay,
    startOfYear,
    subDays,
    subYears,
} from 'date-fns';
import { type TFunction } from 'i18next';
import type { FilterDateRangePreset } from '../../filter-date-range';

export type ComputedPreset = {
    end?: Date | null;
    label: string;
    start?: Date | null;
};

function generateRelativePreset(preset: FilterDateRangePreset, t: TFunction): ComputedPreset | null {
    const today = new Date();

    if ('days' in preset) {
        const isPositive: boolean = preset.days > 0;
        const key = isPositive ? 'date.presetNextDays' : 'date.presetLastDays';
        const end: Date = isPositive ? add(today, { days: preset.days }) : today;
        const start: Date = isPositive ? today : add(today, { days: preset.days });
        const label = t(key, { count: Math.abs(preset.days) });
        return { end, label, start };
    }

    if ('weeks' in preset) {
        const isPositive: boolean = preset.weeks > 0;
        const key = isPositive ? 'date.presetNextWeeks' : 'date.presetLastWeeks';
        const end: Date = isPositive ? add(today, { weeks: preset.weeks }) : today;
        const start: Date = isPositive ? today : add(today, { weeks: preset.weeks });
        const label = t(key, { count: Math.abs(preset.weeks) });
        return { end, label, start };
    }

    if ('months' in preset) {
        const isPositive: boolean = preset.months > 0;
        const key = isPositive ? 'date.presetNextMonths' : 'date.presetLastMonths';
        const end: Date = isPositive ? add(today, { months: preset.months }) : today;
        const start: Date = isPositive ? today : add(today, { months: preset.months });
        const label = t(key, { count: Math.abs(preset.months) });
        return { end, label, start };
    }

    if ('years' in preset) {
        const isPositive: boolean = preset.years > 0;
        const key = isPositive ? 'date.presetNextYears' : 'date.presetLastYears';
        const end: Date = isPositive ? add(today, { years: preset.years }) : today;
        const start: Date = isPositive ? today : add(today, { years: preset.years });
        const label = t(key, { count: Math.abs(preset.years) });
        return { end, label, start };
    }
    return null;
}

function isNextYear(date: Date): boolean {
    return isSameYear(date, addYears(new Date(), 1));
}

function isLastYear(date: Date): boolean {
    return isSameYear(date, subYears(new Date(), 1));
}

function isFirstDayOfYear(date: Date): boolean {
    return isSameDay(date, startOfYear(date));
}

function isLastDayOfYear(date: Date): boolean {
    return isSameDay(date, endOfYear(date));
}

export function computePreset(preset: FilterDateRangePreset, t: TFunction): ComputedPreset {
    const relativePreset = generateRelativePreset(preset, t);
    if (relativePreset !== null) {
        return relativePreset;
    }

    const from = 'start' in preset ? preset.start : null;
    const to = 'end' in preset ? preset.end : null;
    if (from && to && isToday(from) && isToday(to)) {
        return { ...preset, label: t('date.presetToday') };
    }
    if (!from && to && isToday(to)) {
        return { ...preset, label: t('date.presetPast') };
    }
    if (from && to && isYesterday(from) && isYesterday(to)) {
        return { ...preset, label: t('date.presetYesterday') };
    }
    if (from && to && isTomorrow(from) && isTomorrow(to)) {
        return { ...preset, label: t('date.presetTomorrow') };
    }
    if (!to && from && isToday(from)) {
        return { ...preset, label: t('date.presetUpcoming') };
    }
    if (from && to && isFirstDayOfYear(from) && isLastDayOfYear(to)) {
        if (isLastYear(from) && isLastYear(to)) {
            return { ...preset, label: t('date.presetLastYear', { year: from.getFullYear() }) };
        }
        if (isNextYear(from) && isNextYear(to)) {
            return { ...preset, label: t('date.presetNextYear', { year: from.getFullYear() }) };
        }
    }

    return typeof preset.label === 'string' ? preset as ComputedPreset : { ...preset, label: '' };
}

export const FilterDateRangePresets = {
    today(): FilterDateRangePreset {
        const now = new Date();
        return { start: startOfDay(now), end: endOfDay(now) };
    },
    tomorrow(): FilterDateRangePreset {
        const tomorrow = add(new Date(), { days: 1 });
        return { start: startOfDay(tomorrow), end: startOfDay(tomorrow) };
    },
    past(): FilterDateRangePreset {
        return { end: new Date() };
    },
    upcoming(): FilterDateRangePreset {
        return { start: new Date() };
    },
    yesterday(): FilterDateRangePreset {
        const yesterday = subDays(new Date(), 1);
        return { start: startOfDay(yesterday), end: startOfDay(yesterday) };
    },
    lastDays(days: number): FilterDateRangePreset {
        return { days: -days };
    },
    lastWeeks(weeks: number): FilterDateRangePreset {
        return { weeks: -weeks };
    },
    lastMonths(months: number): FilterDateRangePreset {
        return { months: -months };
    },
    lastYear(): FilterDateRangePreset {
        const now = new Date();
        return { end: subYears(endOfYear(now), 1), start: subYears(startOfYear(now), 1) };
    },
    lastYears(years: number): FilterDateRangePreset {
        return { years: -years };
    },
    nextDays(days: number): FilterDateRangePreset {
        return { days };
    },
    nextWeeks(weeks: number): FilterDateRangePreset {
        return { weeks };
    },
    nextMonths(months: number): FilterDateRangePreset {
        return { months };
    },
    nextYear(): FilterDateRangePreset {
        const now = new Date();
        return { end: addYears(endOfYear(now), 1), start: addYears(startOfYear(now), 1) };
    },
    nextYears(years: number): FilterDateRangePreset {
        return { years };
    },
} as const;
