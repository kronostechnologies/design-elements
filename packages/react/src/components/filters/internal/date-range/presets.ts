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
        const label = preset.label ?? t(key, { count: Math.abs(preset.days) });
        return { end, label, start };
    }

    if ('weeks' in preset) {
        const isPositive: boolean = preset.weeks > 0;
        const key = isPositive ? 'date.presetNextWeeks' : 'date.presetLastWeeks';
        const end: Date = isPositive ? add(today, { weeks: preset.weeks }) : today;
        const start: Date = isPositive ? today : add(today, { weeks: preset.weeks });
        const label = preset.label ?? t(key, { count: Math.abs(preset.weeks) });
        return { end, label, start };
    }

    if ('months' in preset) {
        const isPositive: boolean = preset.months > 0;
        const key = isPositive ? 'date.presetNextMonths' : 'date.presetLastMonths';
        const end: Date = isPositive ? add(today, { months: preset.months }) : today;
        const start: Date = isPositive ? today : add(today, { months: preset.months });
        const label = preset.label ?? t(key, { count: Math.abs(preset.months) });
        return { end, label, start };
    }

    if ('years' in preset) {
        const isPositive: boolean = preset.years > 0;
        const key = isPositive ? 'date.presetNextYears' : 'date.presetLastYears';
        const end: Date = isPositive ? add(today, { years: preset.years }) : today;
        const start: Date = isPositive ? today : add(today, { years: preset.years });
        const label = preset.label ?? t(key, { count: Math.abs(preset.years) });
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
        return { label: t('date.presetToday'), ...preset };
    }
    if (!from && to && isToday(to)) {
        return { label: t('date.presetPast'), ...preset };
    }
    if (from && to && isYesterday(from) && isYesterday(to)) {
        return { label: t('date.presetYesterday'), ...preset };
    }
    if (from && to && isTomorrow(from) && isTomorrow(to)) {
        return { label: t('date.presetTomorrow'), ...preset };
    }
    if (!to && from && isToday(from)) {
        return { label: t('date.presetUpcoming'), ...preset };
    }
    if (from && to && isFirstDayOfYear(from) && isLastDayOfYear(to)) {
        if (isLastYear(from) && isLastYear(to)) {
            return { label: t('date.presetLastYear', { year: from.getFullYear() }), ...preset };
        }
        if (isNextYear(from) && isNextYear(to)) {
            return { label: t('date.presetNextYear', { year: from.getFullYear() }), ...preset };
        }
    }

    return typeof preset.label === 'string' ? preset as ComputedPreset : { ...preset, label: '' };
}

export const FilterDateRangePresets = {
    /** From the start of today to the end of today (midnight to end of day). */
    today(): FilterDateRangePreset {
        const now = new Date();
        return { start: startOfDay(now), end: endOfDay(now) };
    },
    /** From the start of tomorrow to the start of tomorrow (midnight to end of day). */
    tomorrow(): FilterDateRangePreset {
        const tomorrow = add(new Date(), { days: 1 });
        return { start: startOfDay(tomorrow), end: endOfDay(tomorrow) };
    },
    /** Everything up to the current time (no start bound). */
    past(): FilterDateRangePreset {
        return { end: new Date() };
    },
    /** Everything from the current time onward (no end bound). */
    upcoming(): FilterDateRangePreset {
        return { start: new Date() };
    },
    /** From the start of yesterday to the start of yesterday (midnight to end of day). */
    yesterday(): FilterDateRangePreset {
        const yesterday = subDays(new Date(), 1);
        return { start: startOfDay(yesterday), end: endOfDay(yesterday) };
    },
    /** From `days` days ago to now, using the current time as boundaries. */
    lastDays(days: number): FilterDateRangePreset {
        return { days: -days };
    },
    /** From `weeks` weeks ago to now, using the current time as boundaries. */
    lastWeeks(weeks: number): FilterDateRangePreset {
        return { weeks: -weeks };
    },
    /** From `months` months ago to now, using the current time as boundaries. */
    lastMonths(months: number): FilterDateRangePreset {
        return { months: -months };
    },
    /** The full calendar year prior to the current year (from Jan 1 at midnight to Dec 31 at end of day). */
    lastYear(): FilterDateRangePreset {
        const now = new Date();
        return { end: subYears(endOfYear(now), 1), start: subYears(startOfYear(now), 1) };
    },
    /** From `years` years ago to now, using the current time as boundaries. */
    lastYears(years: number): FilterDateRangePreset {
        return { years: -years };
    },
    /** From now to `days` days ahead, using the current time as boundaries. */
    nextDays(days: number): FilterDateRangePreset {
        return { days };
    },
    /** From now to `weeks` weeks ahead, using the current time as boundaries. */
    nextWeeks(weeks: number): FilterDateRangePreset {
        return { weeks };
    },
    /** From now to `months` months ahead, using the current time as boundaries. */
    nextMonths(months: number): FilterDateRangePreset {
        return { months };
    },
    /** The full calendar year following the current year (from Jan 1 at midnight to Dec 31 at end of day). */
    nextYear(): FilterDateRangePreset {
        const now = new Date();
        return { end: addYears(endOfYear(now), 1), start: addYears(startOfYear(now), 1) };
    },
    /** From now to `years` years ahead, using the current time as boundaries. */
    nextYears(years: number): FilterDateRangePreset {
        return { years };
    },
} as const;
